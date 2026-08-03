# Checklist legal (España/UE) — estado v0.1.0

> Los textos publicados llevan banda «borrador pendiente de revisión legal».
> Nada de esta lista es asesoramiento jurídico; es la guía de trabajo para
> la revisión profesional.

## Bloqueantes antes de publicar (P0)

- [ ] **Aviso legal LSSI-CE**: denominación social, NIF, domicilio, datos
      registrales y email de contacto en la página de Términos.
      `[POR DEFINIR: datos de la sociedad]`
- [ ] **Privacidad RGPD/LOPDGDD**: responsable real, base jurídica del
      contacto por email, plazos de conservación, derechos y AEPD como
      autoridad. Hoy no hay formularios ni analítica → tratamiento mínimo.
- [ ] Buzones reales: `hola@`, `security@` (hoy placeholders).

## Verificado en v0.1.0

- [x] **Cookies**: solo almacenamiento local estrictamente funcional
      (progreso, tema, acuse del aviso) → encaja en la exención de
      consentimiento del art. 22.2 LSSI (técnicas/necesarias). El aviso es
      informativo, no un muro. Inventario publicado en /legal/cookies.
- [x] **Tipografías**: Archivo y Fraunces bajo SIL OFL 1.1, self-hosted
      (sin transferencias a Google Fonts → sin problema Schrems II).
- [x] **Licencia del repo**: propietaria (LICENSE + NOTICE de terceros).

## Si se activan cosas (disparadores)

- **Analítica** (aunque sea sin cookies): actualizar privacidad y, si hay
  identificadores, reevaluar consentimiento.
- **Formulario de contacto**: registro de actividades de tratamiento,
  cláusula informativa en el propio formulario, DPA con el proveedor.
- **Numinia como marca**: valorar registro OEPM/EUIPO antes de darle más
  peso público.
- **Testimonios/casos**: permisos por escrito (OutThink/Adigital son
  confidenciales: no publicar sin autorización).
