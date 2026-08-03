# Guía de contribución

## Flujo de trabajo

- Rama estable: `main` (protegida; solo merge por PR con CI en verde).
- Ramas de trabajo: `feat/…`, `fix/…`, `docs/…`, `content/…`, `chore/…`.
- Commits: **Conventional Commits** (`feat:`, `fix:`, `docs:`, `content:`…),
  validados por commitlint en el hook `commit-msg`.
- Antes de cada commit, `lint-staged` formatea y lintea lo staged (husky).

## Puertas de calidad (las mismas que el CI)

```bash
pnpm check      # tipos
pnpm lint       # ESLint + reglas a11y (jsx-a11y strict)
pnpm test       # unitarios (motor de viaje)
pnpm build      # build estático
pnpm test:e2e   # axe/Playwright (requiere `pnpm exec playwright install` y build previo)
```

## Definition of Done

Un cambio está terminado cuando:

1. Pasa las cinco puertas de arriba.
2. Existe en **ES y EN** (contenido y UI) o queda registrado en `docs/BACKLOG.md`.
3. No rompe la degradación **sin JavaScript** ni `prefers-reduced-motion`.
4. Los textos nuevos viven en `src/content/story/` o `src/i18n/ui.ts`, nunca
   hardcodeados en componentes.
5. `CHANGELOG.md` actualizado si afecta a usuarios.
6. Si toca gamificación, respeta los principios de `docs/GAMIFICATION.md`
   (nunca bloquear contenido, siempre reversible).

## Identidad y firma de commits

- Cada persona commitea con su identidad real (`git config user.name/email`).
  El histórico local de hoy comparte una identidad de conveniencia
  (`dev@numen.games`) — motivo directo de esta norma.
- Al publicar en GitHub: **firma obligatoria** (SSH o GPG) y
  `Require signed commits` en la protección de rama.
- Nada entra en `main` sin PR, ni siquiera en local: las versiones
  v0.2.0→v1.0.0 de hoy entraron en directo; con branch protection no
  volverá a ocurrir.

## Publicación inicial en GitHub

```bash
git remote add origin git@github.com:<ORG>/numen-web.git   # [POR DEFINIR: org]
git push -u origin main --follow-tags
```

Después, en Settings del repo:

- **Branch protection** en `main`: requerir PR, CI (`quality`, `a11y`,
  `lighthouse`) y al menos 1 aprobación; prohibir force-push.
- **Actions**: permisos de solo lectura por defecto (el workflow ya lo declara).
- **Dependabot**: se activa solo con `.github/dependabot.yml`.
- Completar los `[POR DEFINIR]` de `CODEOWNERS`, `SECURITY.md` y `package.json`
  (URL del repo).

## Releases

SemVer manual: actualizar `package.json` + `CHANGELOG.md`, commit
`chore(release): vX.Y.Z`, etiquetar `git tag vX.Y.Z` y push con
`--follow-tags`. La versión del pie de página se lee de `package.json`.
Checklist previa a publicar en producción: `docs/RELEASE_CHECKLIST.md`.
