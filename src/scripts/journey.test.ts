import { describe, expect, it } from 'vitest';
import { createJourney, type StorageLike } from './journey';

function memoryStorage(): StorageLike {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k),
  };
}

const PHASES = ['fase-0', 'fase-1', 'fase-2', 'fase-3'] as const;

describe('journey (motor Nivel B)', () => {
  it('marca fases visitadas de forma idempotente y calcula el progreso', () => {
    const j = createJourney(memoryStorage(), PHASES);
    expect(j.progress()).toBe(0);
    j.markVisited('fase-0');
    j.markVisited('fase-0');
    j.markVisited('fase-1');
    expect(j.snapshot().visited).toEqual(['fase-0', 'fase-1']);
    expect(j.progress()).toBeCloseTo(0.5);
  });

  it('persiste elecciones entre instancias (mismo storage)', () => {
    const storage = memoryStorage();
    const a = createJourney(storage, PHASES);
    a.choose('choice-transformacion', 1);
    const b = createJourney(storage, PHASES);
    expect(b.getChoice('choice-transformacion')).toBe(1);
  });

  it('desbloquea huevos de pascua una sola vez', () => {
    const j = createJourney(memoryStorage(), PHASES);
    expect(j.hasEgg('sigil')).toBe(false);
    j.unlockEgg('sigil');
    j.unlockEgg('sigil');
    expect(j.snapshot().eggs).toEqual(['sigil']);
  });

  it('reset devuelve el estado al umbral', () => {
    const storage = memoryStorage();
    const j = createJourney(storage, PHASES);
    j.markVisited('fase-2');
    j.choose('c', 0);
    j.reset();
    expect(j.progress()).toBe(0);
    expect(j.getChoice('c')).toBeUndefined();
    expect(storage.getItem('numen.journey.v1')).toBeNull();
  });

  it('sobrevive a datos corruptos en storage', () => {
    const storage = memoryStorage();
    storage.setItem('numen.journey.v1', '{esto no es json');
    const j = createJourney(storage, PHASES);
    expect(j.progress()).toBe(0);
  });
});
