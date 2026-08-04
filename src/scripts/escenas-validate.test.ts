import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  extraerTokensDeColor,
  validateEscenas,
  type EscenaPlana,
  type EscenarioPlano,
  type PersonajePlano,
} from './escenas-validate';

/* ------------------------------------------------------------------ */
/* Guion de laboratorio: un caso VÁLIDO que cada test muta a propósito */
/* ------------------------------------------------------------------ */

/**
 * Construye un guion mínimo pero completo en ambos idiomas: un personaje
 * con poses, un escenario y cinco escenas (una por etapa del funnel, la
 * de 'accion' la última por orden). Cada test parte de una copia fresca
 * y rompe UNA regla, para que el fallo señale exactamente esa regla.
 */
function crearGuionValido(): {
  personajes: PersonajePlano[];
  escenarios: EscenarioPlano[];
  escenas: EscenaPlana[];
} {
  const personajes: PersonajePlano[] = (['es', 'en'] as const).map((lang) => ({
    id: 'nomada',
    lang,
    nombre: lang === 'es' ? 'El Nómada' : 'The Nomad',
    papel: 'avatar',
    colorHablante: 'verdemar',
    sprite: 'nomada.svg',
    poses: ['reposo', 'camina'],
    reglasDeVoz: 'habla en segunda persona',
    limites: 'nunca promete resultados',
  }));

  const escenarios: EscenarioPlano[] = (['es', 'en'] as const).map((lang) => ({
    id: 'desierto',
    lang,
    nombre: lang === 'es' ? 'El Desierto' : 'The Desert',
    bandas: ['arena', 'ambar'],
    elementos: ['duna', 'portal'],
    luz: 'ambar',
    tramoPanoramica: 0,
  }));

  const etapas = ['conciencia', 'interes', 'consideracion', 'intencion', 'accion'] as const;
  const escenas: EscenaPlana[] = (['es', 'en'] as const).flatMap((lang) =>
    etapas.map((funnel, indice): EscenaPlana => ({
      id: `escena-${String(indice + 1)}`,
      orden: indice + 1,
      lang,
      acto: 1,
      fase: indice,
      funnel,
      escenario: 'desierto',
      beats: [
        {
          hablante: 'nomada',
          parlamento: 'Camina conmigo.',
          accion: { verbo: 'pose', pose: 'camina' },
        },
        { hablante: 'sistema', parlamento: 'El viento sopla.', accion: { verbo: 'pausa' } },
      ],
    })),
  );

  return { personajes, escenarios, escenas };
}

describe('validateEscenas (validaciones cruzadas del guion)', () => {
  it('acepta un guion completo y válido, sin ningún error', () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.errores).toEqual([]);
    expect(resultado.valido).toBe(true);
  });

  it('pasa con las colecciones vacías (el guion aún no existe)', () => {
    const resultado = validateEscenas([], [], []);
    expect(resultado.errores).toEqual([]);
    expect(resultado.valido).toBe(true);
  });

  it("regla (a): rechaza dos escenas con funnel='accion' en el mismo idioma", () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    // Convertimos la escena de 'intencion' de ambos idiomas en un segundo cierre.
    for (const escena of escenas) {
      if (escena.funnel === 'intencion') escena.funnel = 'accion';
    }
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain(
      "exactamente una escena con funnel='accion' y hay 2",
    );
  });

  it("regla (a): rechaza que la escena de funnel='accion' no sea la última por orden", () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    // Empujamos la escena de 'conciencia' más allá del cierre.
    for (const escena of escenas) {
      if (escena.funnel === 'conciencia') escena.orden = 99;
    }
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain('debe ser la última por orden');
  });

  it('regla (b): rechaza un guion al que le falta una etapa del funnel', () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const sinInteres = escenas.filter((escena) => escena.funnel !== 'interes');
    const resultado = validateEscenas(sinInteres, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain("falta la etapa 'interes' del funnel");
  });

  it('regla (c): rechaza una pose no declarada en poses[] del personaje', () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const primera = escenas[0];
    const beat = primera?.beats[0];
    if (!primera || !beat) throw new Error('el guion de laboratorio debe tener beats');
    beat.accion = { verbo: 'pose', pose: 'vuela' };
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain("la pose 'vuela' no está declarada en poses[]");
  });

  it("regla (c): rechaza que 'sistema' adopte una pose (no es un personaje)", () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const beatDeSistema = escenas[0]?.beats[1];
    if (!beatDeSistema) throw new Error('el guion de laboratorio debe tener beats');
    beatDeSistema.accion = { verbo: 'pose', pose: 'reposo' };
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain("'sistema' no puede adoptar poses");
  });

  it('regla (d): rechaza un id presente en un idioma y ausente en el otro', () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const soloEs = personajes.filter((personaje) => personaje.lang === 'es');
    const resultado = validateEscenas(escenas, soloEs, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain(
      "personajes: 'nomada' existe en 'es' pero falta en 'en'",
    );
  });

  it('regla (h): rechaza un colorHablante fuera del subconjunto de diálogo', () => {
    const { personajes, escenarios, escenas } = crearGuionValido();
    const primero = personajes[0];
    if (!primero) throw new Error('el guion de laboratorio debe tener personajes');
    // Turquesa canónica: en el subconjunto de §3.7 sobre Noche, pero cae
    // a 4.43:1 sobre el Basalto real de la caja — debe rechazarse.
    primero.colorHablante = 'turquesa';
    const resultado = validateEscenas(escenas, personajes, escenarios);
    expect(resultado.valido).toBe(false);
    expect(resultado.errores.join('\n')).toContain('fuera del subconjunto de diálogo');
  });
});

describe('extraerTokensDeColor (enum del canon leído de tokens.css)', () => {
  it('extrae tokens hex, resuelve cadenas de alias var() y descarta lo que no es color', () => {
    const css = `:root {
      --noche: #14110f;
      --alias: var(--noche);
      --doble-alias: var(--alias);
      --sombra: 0 0 12px rgba(0, 0, 0, 0.2);
      --texto: 1rem;
    }`;
    expect(extraerTokensDeColor(css)).toEqual(['alias', 'doble-alias', 'noche']);
  });

  it('encuentra los tokens reales del canon en src/styles/tokens.css', () => {
    // Test de integración: si la paleta se renombra, esto avisa de que el
    // enum de colorHablante/bandas/luz cambia con ella.
    const cssReal = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf-8');
    const tokens = extraerTokensDeColor(cssReal);
    expect(tokens).toContain('turquesa');
    expect(tokens).toContain('ambar');
    expect(tokens).toContain('arena');
    // Un token que existe pero NO es color no debe colarse en el enum.
    expect(tokens).not.toContain('stack-display');
    expect(tokens).not.toContain('halo-legendario');
  });
});

/* ------------------------------------------------------------------ */
/* ADR 0009: elecciones y roles                                        */
/* ------------------------------------------------------------------ */

describe('validateEscenas — elecciones y roles (ADR 0009)', () => {
  /** Añade al guion válido una elección de rol correcta en la escena 3
   *  y un beat ramificado por rol en la 4, en ambos idiomas. */
  function conEleccionDeRol() {
    const guion = crearGuionValido();
    for (const escena of guion.escenas) {
      if (escena.orden === 3) {
        escena.beats.push({
          hablante: 'sistema',
          eleccion: {
            id: 'proposito',
            pregunta: '¿Qué has venido a proteger?',
            opciones: [
              { etiqueta: 'VALOR Y MEMORIA', consecuencia: 'Anfitrión.', rol: 'anfitrion' },
              { etiqueta: 'OPORTUNIDADES', consecuencia: 'Impulsor.', rol: 'impulsor' },
              { etiqueta: 'DIRECCIÓN', consecuencia: 'Explorador.', rol: 'explorador' },
            ],
          },
        });
      }
      if (escena.orden === 4) {
        escena.beats.push({
          hablante: 'sistema',
          parlamento: 'Solo para quien organiza.',
          rol: 'anfitrion',
        });
      }
    }
    return guion;
  }

  it('acepta una elección de rol completa con ramificación posterior', () => {
    const { personajes, escenarios, escenas } = conEleccionDeRol();
    expect(validateEscenas(escenas, personajes, escenarios).errores).toEqual([]);
  });

  it('(e) rechaza ids de elección repetidos en el mismo idioma', () => {
    const guion = conEleccionDeRol();
    for (const escena of guion.escenas) {
      if (escena.orden === 5) {
        escena.beats.push({
          hablante: 'sistema',
          eleccion: {
            id: 'proposito', // repetido a propósito
            opciones: [
              { etiqueta: 'A', consecuencia: 'a' },
              { etiqueta: 'B', consecuencia: 'b' },
            ],
          },
        });
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes("'proposito'") && e.includes('únicos'))).toBe(true);
  });

  it('(e-bis) rechaza una elección con distinto número de opciones por idioma', () => {
    const guion = conEleccionDeRol();
    for (const escena of guion.escenas) {
      if (escena.orden === 2 && escena.lang === 'es') {
        escena.beats.push({
          hablante: 'sistema',
          eleccion: {
            id: 'hilos',
            opciones: [
              { etiqueta: 'CONECTAR', consecuencia: 'Ruta.' },
              { etiqueta: 'DEJAR', consecuencia: 'Se pierde.' },
            ],
          },
        });
      }
      if (escena.orden === 2 && escena.lang === 'en') {
        escena.beats.push({
          hablante: 'sistema',
          eleccion: {
            id: 'hilos',
            opciones: [
              { etiqueta: 'CONNECT', consecuencia: 'Route.' },
              { etiqueta: 'LET GO', consecuencia: 'Lost.' },
              { etiqueta: 'EXTRA', consecuencia: 'De más.' },
            ],
          },
        });
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes("'hilos'") && e.includes('opciones'))).toBe(true);
  });

  it('(f) rechaza la elección de rol que mezcla opciones con y sin rol', () => {
    const guion = conEleccionDeRol();
    for (const escena of guion.escenas) {
      for (const beat of escena.beats) {
        if (beat.eleccion?.id === 'proposito' && beat.eleccion.opciones[0]) {
          delete beat.eleccion.opciones[0].rol;
        }
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes('todas las opciones asignan rol o ninguna'))).toBe(true);
  });

  it('(f) rechaza la elección de rol que no cubre los tres roles', () => {
    const guion = conEleccionDeRol();
    for (const escena of guion.escenas) {
      for (const beat of escena.beats) {
        if (beat.eleccion?.id === 'proposito' && beat.eleccion.opciones[2]) {
          beat.eleccion.opciones[2].rol = 'anfitrion'; // repite y deja 'explorador' sin cubrir
        }
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes('repite'))).toBe(true);
    expect(errores.some((e) => e.includes("'explorador'"))).toBe(true);
  });

  it('(g) rechaza ramificar por rol antes de la elección de rol', () => {
    const guion = conEleccionDeRol();
    for (const escena of guion.escenas) {
      if (escena.orden === 1) {
        escena.beats.push({ hablante: 'sistema', parlamento: 'Prematuro.', rol: 'impulsor' });
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes('antes o durante'))).toBe(true);
  });

  it('(g) rechaza beats con rol cuando no existe elección de rol alguna', () => {
    const guion = crearGuionValido();
    for (const escena of guion.escenas) {
      if (escena.orden === 4) {
        escena.beats.push({ hablante: 'sistema', parlamento: 'Huérfano.', rol: 'explorador' });
      }
    }
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes('ninguna elección de rol'))).toBe(true);
  });
});

describe('validateEscenas — regla h (todo beat dice algo)', () => {
  it('(h) rechaza un beat sin parlamento y sin eleccion', () => {
    const guion = crearGuionValido();
    const escena = guion.escenas.find((e) => e.orden === 1 && e.lang === 'es');
    escena?.beats.push({ hablante: 'sistema' });
    const { errores } = validateEscenas(guion.escenas, guion.personajes, guion.escenarios);
    expect(errores.some((e) => e.includes('regla h'))).toBe(true);
  });
});
