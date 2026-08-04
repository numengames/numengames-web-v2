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
    colorHablante: 'turquesa',
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
