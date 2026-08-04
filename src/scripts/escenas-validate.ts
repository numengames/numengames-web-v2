/**
 * Motor de escena — validaciones cruzadas del guion (ADR 0008).
 *
 * Este módulo NO importa `astro:content` a propósito: los módulos `astro:*`
 * son virtuales (solo existen dentro del build de Astro) y harían imposible
 * ejecutar estas funciones en Vitest. Por eso todo aquí son funciones puras
 * que reciben datos planos tipados por parámetro; el integrador las llamará
 * con las entradas ya cargadas de las colecciones.
 *
 * Zod (en `src/content.config.ts`) valida cada entrada POR SEPARADO; aquí
 * viven las reglas que necesitan mirar varias entradas a la vez: unicidad
 * del cierre del funnel, cobertura de etapas, poses declaradas y paridad
 * ES/EN.
 */

/* ------------------------------------------------------------------ */
/* Tipos planos (espejo de los esquemas Zod de content.config.ts)      */
/* ------------------------------------------------------------------ */

export const IDIOMAS = ['es', 'en'] as const;
export type Lang = (typeof IDIOMAS)[number];

export type Papel = 'avatar' | 'voz' | 'secundario';

/** Las cinco etapas, en el orden natural del funnel. */
export const ETAPAS_FUNNEL = [
  'conciencia',
  'interes',
  'consideracion',
  'intencion',
  'accion',
] as const;
export type Funnel = (typeof ETAPAS_FUNNEL)[number];

/** Hablante reservado para la voz del sistema (no es un personaje). */
export const HABLANTE_SISTEMA = 'sistema' as const;

/**
 * Vocabulario CERRADO de acciones escénicas (ADR 0008). Añadir un verbo
 * exige cambiar este tipo Y el `z.discriminatedUnion` de content.config.ts:
 * es un cambio de esquema deliberado, no una extensión libre del guion.
 */
export type Accion =
  | { verbo: 'entra' }
  | { verbo: 'sale' }
  | { verbo: 'pose'; pose: string }
  | { verbo: 'camina-hasta'; destino: string }
  | { verbo: 'luz'; token: string }
  | { verbo: 'pausa' };

export interface PersonajePlano {
  id: string;
  lang: Lang;
  nombre: string;
  papel: Papel;
  /** Nombre de token del canon (sin `--`), nunca un valor hex. */
  colorHablante: string;
  /** Ruta relativa a src/assets/pixel/. */
  sprite: string;
  poses: string[];
  reglasDeVoz: string;
  limites: string;
}

export interface EscenarioPlano {
  id: string;
  lang: Lang;
  nombre: string;
  /** Tokens del canon para las bandas de color del fondo. */
  bandas: string[];
  elementos: string[];
  /** Una luz por tramo: cada escenario ocupa exactamente un tramo. */
  luz: string;
  tramoPanoramica: number;
}

export interface Beat {
  /** Id de un personaje del mismo idioma, o el literal 'sistema'. */
  hablante: string;
  parlamento: string;
  accion?: Accion;
}

export interface EscenaPlana {
  /** Id de la entrada (en Astro sale del nombre de fichero, no del frontmatter). */
  id: string;
  orden: number;
  lang: Lang;
  acto: number;
  fase: number;
  funnel: Funnel;
  /** Id del escenario referenciado. */
  escenario: string;
  beats: Beat[];
}

export interface ResultadoValidacion {
  valido: boolean;
  /** Vacío cuando `valido` es true; mensajes legibles cuando no. */
  errores: string[];
}

/* ------------------------------------------------------------------ */
/* Tokens del canon                                                    */
/* ------------------------------------------------------------------ */

/**
 * Extrae de un CSS los nombres de custom properties que representan un
 * color: las declaradas con un valor hex (`--turquesa: #018ea1`) y, por
 * cierre transitivo, los alias que apuntan a ellas (`--interactive:
 * var(--turquesa)`). Así el enum de `colorHablante`/`bandas`/`luz` se
 * genera desde `src/styles/tokens.css` y nunca se desincroniza del canon
 * («tokens mandan y no inventes valores», CLAUDE.md).
 *
 * Se excluye a propósito lo que no es un color puro (tipografías, sombras
 * como `--halo-legendario`, escalas): no tendría sentido pintar un
 * hablante con `--text-sm`.
 */
export function extraerTokensDeColor(css: string): string[] {
  // nombre → lista de valores (un token puede declararse en varios temas).
  const declaraciones = new Map<string, string[]>();
  for (const coincidencia of css.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    const [, nombre, valor] = coincidencia;
    if (!nombre || !valor) continue;
    const lista = declaraciones.get(nombre) ?? [];
    lista.push(valor.trim());
    declaraciones.set(nombre, lista);
  }

  const esColorHex = (valor: string): boolean => /^#[0-9a-fA-F]{3,8}$/.test(valor);
  const conColor = new Set<string>();
  for (const [nombre, valores] of declaraciones) {
    if (valores.some(esColorHex)) conColor.add(nombre);
  }

  // Cierre transitivo: repetimos hasta que no aparezcan alias nuevos, para
  // resolver cadenas como --a: var(--b); --b: var(--c); --c: #fff.
  let huboCambio = true;
  while (huboCambio) {
    huboCambio = false;
    for (const [nombre, valores] of declaraciones) {
      if (conColor.has(nombre)) continue;
      const apuntaAColor = valores.some((valor) => {
        const referencia = /^var\(--([\w-]+)\)$/.exec(valor);
        return referencia?.[1] !== undefined && conColor.has(referencia[1]);
      });
      if (apuntaAColor) {
        conColor.add(nombre);
        huboCambio = true;
      }
    }
  }

  return [...conColor].sort();
}

/* ------------------------------------------------------------------ */
/* Validación cruzada del guion                                        */
/* ------------------------------------------------------------------ */

/**
 * Regla (d): paridad ES/EN. Cada id debe existir en ambos idiomas; un id
 * huérfano significa que un visitante de uno de los dos idiomas vería un
 * guion incompleto, y eso rompe la regla dura n.º 5 de CLAUDE.md.
 */
function comprobarParidad(
  coleccion: string,
  entradas: readonly { id: string; lang: Lang }[],
  errores: string[],
): void {
  const porIdioma = new Map<Lang, Set<string>>(IDIOMAS.map((lang) => [lang, new Set()]));
  for (const entrada of entradas) {
    porIdioma.get(entrada.lang)?.add(entrada.id);
  }
  const [es, en] = IDIOMAS.map((lang) => porIdioma.get(lang) ?? new Set<string>());
  if (!es || !en) return; // imposible por construcción; contenta al modo estricto
  for (const id of es) {
    if (!en.has(id)) errores.push(`${coleccion}: '${id}' existe en 'es' pero falta en 'en'`);
  }
  for (const id of en) {
    if (!es.has(id)) errores.push(`${coleccion}: '${id}' existe en 'en' pero falta en 'es'`);
  }
}

/**
 * Validaciones que no caben en Zod por-entrada (ADR 0008):
 *
 *  (a) exactamente una escena con funnel='accion' por idioma, y es la
 *      última por `orden` — el guion termina en una única llamada a la
 *      acción, no en varias ni a mitad de viaje;
 *  (b) las cinco etapas del funnel están presentes en cada idioma — un
 *      guion que salta etapas no cumple su función comercial;
 *  (c) toda pose usada en un beat está declarada en `poses[]` del
 *      personaje que la adopta (y 'sistema' no posa: no tiene cuerpo);
 *  (d) paridad ES/EN de ids en las tres colecciones.
 *
 * Caso vacío: mientras el guion no exista (docs/narrativa/ vacío), las
 * colecciones llegan vacías y la validación PASA — las reglas (a) y (b)
 * solo se evalúan cuando hay escenas que evaluar.
 */
export function validateEscenas(
  escenas: readonly EscenaPlana[],
  personajes: readonly PersonajePlano[],
  escenarios: readonly EscenarioPlano[],
): ResultadoValidacion {
  const errores: string[] = [];

  // (d) La paridad se comprueba siempre: sobre colecciones vacías pasa
  // trivialmente, y si alguien escribe un personaje solo en un idioma
  // queremos el aviso aunque las escenas aún no existan.
  comprobarParidad('personajes', personajes, errores);
  comprobarParidad('escenarios', escenarios, errores);
  comprobarParidad('escenas', escenas, errores);

  // (a) y (b) por idioma: cada idioma cuenta su propio viaje completo.
  if (escenas.length > 0) {
    for (const lang of IDIOMAS) {
      const delIdioma = escenas.filter((escena) => escena.lang === lang);
      // Si un idioma está vacío del todo, la paridad (d) ya lo denuncia;
      // no añadimos ruido repitiendo el fallo etapa a etapa.
      if (delIdioma.length === 0) continue;

      const deAccion = delIdioma.filter((escena) => escena.funnel === 'accion');
      const [unica] = deAccion;
      if (deAccion.length !== 1 || !unica) {
        errores.push(
          `escenas [${lang}]: debe haber exactamente una escena con funnel='accion' y hay ${String(deAccion.length)}`,
        );
      } else {
        const ultima = delIdioma.reduce((a, b) => (b.orden > a.orden ? b : a));
        if (ultima.id !== unica.id) {
          errores.push(
            `escenas [${lang}]: la escena de funnel='accion' ('${unica.id}') debe ser la última por orden, pero la última es '${ultima.id}'`,
          );
        }
      }

      const presentes = new Set(delIdioma.map((escena) => escena.funnel));
      for (const etapa of ETAPAS_FUNNEL) {
        if (!presentes.has(etapa)) {
          errores.push(`escenas [${lang}]: falta la etapa '${etapa}' del funnel`);
        }
      }
    }
  }

  // (c) Poses: el guion solo puede pedir poses que el personaje declara.
  for (const escena of escenas) {
    escena.beats.forEach((beat, indice) => {
      const accion = beat.accion;
      if (accion?.verbo !== 'pose') return;
      const donde = `escena '${escena.id}' [${escena.lang}], beat ${String(indice)}`;
      if (beat.hablante === HABLANTE_SISTEMA) {
        errores.push(`${donde}: 'sistema' no puede adoptar poses (no es un personaje)`);
        return;
      }
      const personaje = personajes.find(
        (candidato) => candidato.id === beat.hablante && candidato.lang === escena.lang,
      );
      if (!personaje) {
        errores.push(`${donde}: el hablante '${beat.hablante}' no existe en '${escena.lang}'`);
        return;
      }
      if (!personaje.poses.includes(accion.pose)) {
        errores.push(
          `${donde}: la pose '${accion.pose}' no está declarada en poses[] de '${personaje.id}'`,
        );
      }
    });
  }

  return { valido: errores.length === 0, errores };
}
