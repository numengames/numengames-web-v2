# Despliegue

Salida 100 % estática (`pnpm build` → `dist/`). Cualquier CDN estático vale;
recomendado Cloudflare Pages o Netlify (ambos leen `public/_headers`).

## Cloudflare Pages / Netlify

- Build command: `pnpm build` · Output: `dist` · Node 22 (`.nvmrc`).
- Variables de entorno: ninguna en v0.1.0.
- Dominio: `numen.games` + redirección apex/www según DNS.
- `public/_headers` aplica las cabeceras de seguridad (CSP incluida).
  La CSP permite `'unsafe-inline'` en scripts por el script de tema
  pre-render; endurecer con hash sha256 del script inline es tarea P1.

## Verificación post-deploy

`curl -I https://numen.games/es/` → 200 + cabeceras; `/` → redirige a `/es/`;
`/sitemap-index.xml` accesible; Lighthouse ≥ 0.9/0.95 sobre producción.
