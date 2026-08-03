# Checklist de release a producción

1. [ ] `pnpm check && pnpm lint && pnpm test && pnpm build` en verde local.
2. [ ] CI verde en `main` (quality + a11y + lighthouse).
3. [ ] Sin `[POR DEFINIR]` visibles en páginas públicas (`grep -R "POR DEFINIR" src/`).
4. [ ] Banda «pendiente de revisión legal» retirada **solo** con OK de Legal.
5. [ ] Prueba manual: teclado completo, `prefers-reduced-motion`, sin JS,
       ambos temas, móvil 360px.
6. [ ] hreflang/canonical correctos en las URLs finales (dominio real).
7. [ ] `CHANGELOG.md` + versión + tag `vX.Y.Z` (`--follow-tags`).
8. [ ] Cabeceras de seguridad activas en el hosting (`public/_headers`).
9. [ ] Copia de seguridad del deploy anterior / rollback plan del hosting.
