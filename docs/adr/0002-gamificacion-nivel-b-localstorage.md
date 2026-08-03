# ADR 0002 — Gamificación Nivel B en cliente (localStorage), sin backend

**Estado:** aceptada · 2026-08-03

Progreso, elecciones y huevos viven en `numen.journey.v1` (localStorage) con
fallback en memoria si el almacenamiento está bloqueado. Sin cuentas ni
servidor: privacidad por diseño, coste cero, y el aviso de cookies queda en
capa informativa (almacenamiento estrictamente funcional).

**Límite asumido:** el estado no viaja entre dispositivos. Si algún día se
quiere continuidad multi-dispositivo (Nivel C), requerirá backend + RGPD
completo → ADR nuevo.
