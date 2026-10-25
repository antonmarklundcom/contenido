<?php
/**
 * Handler de leads — contenido.com.py
 *
 * El navegador postea ACÁ, nunca directo al CRM: la API key no puede vivir en
 * el bundle de JavaScript. Este archivo reenvía a VenderCRM y, si el CRM
 * todavía no está configurado o falla, deja el lead en un log FUERA de la
 * carpeta web (../private/contenido-leads.log) para que ninguna consulta se
 * pierda sin quedar descargable por URL.
 *
 * Configuración en Hostinger (hPanel → Avanzado → Variables de entorno), o
 * en un .env fuera de public_html:
 *   VENDERCRM_URL      https://<dominio-crm>/api/v1/leads
 *   VENDERCRM_API_KEY  <clave del tenant>
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Solo aceptamos envíos del propio sitio: Origin/Referer deben coincidir con
// el host y, si faltan los dos, se rechaza.
$host = strtolower((string)($_SERVER['HTTP_HOST'] ?? ''));
$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin === '') {
    $origin = (string)($_SERVER['HTTP_REFERER'] ?? '');
}
$originHost = $origin !== '' ? strtolower((string)parse_url($origin, PHP_URL_HOST) . (parse_url($origin, PHP_URL_PORT) ? ':' . parse_url($origin, PHP_URL_PORT) : '')) : '';
if ($host === '' || $originHost === '' || $originHost !== $host) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'origen_no_permitido']);
    exit;
}

// Trampa anti-spam: si el campo oculto viene lleno, es un bot.
// Respondemos 200 para no darle señal de que fue detectado.
if (!empty($_POST['empresa_web'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$nombre   = trim((string)($_POST['nombre']   ?? ''));
$telefono = trim((string)($_POST['telefono'] ?? ''));
$mensaje  = trim((string)($_POST['mensaje']  ?? ''));
$site     = 'contenido.com.py'; // fijo en el servidor, no se acepta del cliente
$pagePath = mb_substr(trim((string)($_POST['page_path'] ?? '/')), 0, 200);

if ($nombre === '' || $telefono === '' || $mensaje === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'campos_incompletos']);
    exit;
}

if (mb_strlen($nombre) > 120 || mb_strlen($telefono) > 40 || mb_strlen($mensaje) > 4000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'campos_muy_largos']);
    exit;
}

$payload = [
    'name'       => $nombre,
    'phone'      => $telefono,
    'message'    => $mensaje,
    'source'     => 'site:' . $site,
    'page_path'  => $pagePath,
    'created_at' => gmdate('c'),
];

$crmUrl = getenv('VENDERCRM_URL') ?: '';
$crmKey = getenv('VENDERCRM_API_KEY') ?: '';
$forwarded = false;

if ($crmUrl !== '' && $crmKey !== '') {
    $ch = curl_init($crmUrl);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'X-Api-Key: ' . $crmKey,
        ],
    ]);
    curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $forwarded = $status >= 200 && $status < 300;
}

// Respaldo local: siempre se escribe si el reenvío no confirmó.
// El log vive fuera de la raíz web (../private, 0700) y tiene tope de tamaño:
// al pasarlo, el lead va a error_log en vez de crecer sin límite.
if (!$forwarded) {
    $line = json_encode($payload, JSON_UNESCAPED_UNICODE) . PHP_EOL;
    $privDir = dirname($_SERVER['DOCUMENT_ROOT'] ?: __DIR__) . '/private';
    if (!is_dir($privDir)) {
        @mkdir($privDir, 0700, true);
    }
    $logFile = $privDir . '/contenido-leads.log';
    $maxBytes = 5 * 1024 * 1024;
    if (is_dir($privDir) && (!is_file($logFile) || (int)@filesize($logFile) < $maxBytes)
        && @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX) !== false) {
        // guardado
    } else {
        error_log('contenido lead (sin CRM ni log): ' . $line);
    }
}

echo json_encode(['ok' => true]);
