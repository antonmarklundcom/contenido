<?php
/**
 * Handler de leads — contenido.com.py
 *
 * El navegador postea ACÁ, nunca directo al CRM: la API key no puede vivir en
 * el bundle de JavaScript. Este archivo reenvía a VenderCRM y, si el CRM
 * todavía no está configurado o falla, deja el lead en leads.log para que
 * ninguna consulta se pierda.
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

// Trampa anti-spam: si el campo oculto viene lleno, es un bot.
// Respondemos 200 para no darle señal de que fue detectado.
if (!empty($_POST['empresa_web'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$nombre   = trim((string)($_POST['nombre']   ?? ''));
$telefono = trim((string)($_POST['telefono'] ?? ''));
$mensaje  = trim((string)($_POST['mensaje']  ?? ''));
$site     = trim((string)($_POST['site']     ?? 'contenido.com.py'));
$pagePath = trim((string)($_POST['page_path'] ?? '/'));

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
// leads.log está en .gitignore y no debe quedar accesible desde la web.
if (!$forwarded) {
    $line = json_encode($payload, JSON_UNESCAPED_UNICODE) . PHP_EOL;
    @file_put_contents(__DIR__ . '/leads.log', $line, FILE_APPEND | LOCK_EX);
}

echo json_encode(['ok' => true]);
