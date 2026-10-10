# VenderCRM server configuration

New setup uses only VENDERCRM_URL (HTTPS base origin, e.g. https://crm.clientes.com.py) and VENDERCRM_API_KEY (this site's secret). Never use an API path, browser variables, or committed credentials. The adapter appends /api/v1/leads once.

Preferred persistent file: one level above the actual document root, private/vendercrm.php. It returns an array containing those two uppercase names. The file must physically remain outside the document root, including after symlink resolution. VENDERCRM_CONFIG_FILE is an optional absolute private-file override. Do not put the persistent file in a deployment artifact.

```php
<?php
return ['VENDERCRM_URL' => 'https://crm.clientes.com.py', 'VENDERCRM_API_KEY' => '']; // fill privately, never commit
```

A complete canonical environment pair or private file overrides the old effective configuration. Partial canonical pairs fail validation and are never blended with legacy fields. Conflicting canonical environment/file pairs fail validation; remove stale duplicate canonical settings. No canonical source preserves the old loader. Existing local .env and non-CRM settings keep their behavior.

Compatibility transition: historical process VENDERCRM_URL containing exactly /api/v1/leads is normalized to the base origin. Other paths, query strings or fragments are rejected. New private-file setup always requires a base origin. The loader is public/lib/vendercrm-config.php; Vite copies public/ into dist/. Production document root is dist/public_html, not repository public/ after deployment.

For a root-deployed PHP site the loader uses the repository root as its document root. contenido uses the handler directory. Verify the actual hosting layout first. Retain the private directory through deployments, and configure filesystem permissions. PHP file changes normally apply next request; PHP worker environment changes may require a worker restart and OPcache refresh. Code changes require deploying the changed adapter and lib directory. Keep all existing capture flags, sinks, queues, storage and notifications unchanged.

Website /admin does not install these settings. Hostinger runtime settings/private files configure transport; VenderCRM /sites configures routing and activation. No live delivery is claimed. Do not test with real leads as part of local checks.
