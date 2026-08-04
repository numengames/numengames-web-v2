import { describe, expect, it } from 'vitest';
import { panoramaProgress, threadProgress } from './viewport';

describe('threadProgress (motor de reserva del hilo de progreso)', () => {
  it('devuelve 0 al principio de la página', () => {
    expect(threadProgress(0, 3000, 800)).toBe(0);
  });

  it('devuelve 1 al final de la página', () => {
    expect(threadProgress(2200, 3000, 800)).toBe(1);
  });

  it('interpola linealmente entre extremos', () => {
    expect(threadProgress(1100, 3000, 800)).toBeCloseTo(0.5);
  });

  it('no supera [0,1] con scroll fuera de rango (rebote elástico, etc.)', () => {
    expect(threadProgress(-50, 3000, 800)).toBe(0);
    expect(threadProgress(999999, 3000, 800)).toBe(1);
  });

  it('no divide por cero cuando la página no tiene scroll', () => {
    expect(threadProgress(0, 800, 800)).toBe(0);
  });
});

describe('panoramaProgress (motor de reserva de la panorámica)', () => {
  const viewportHeight = 800;
  const journeyTop = 1200;
  const journeyHeight = 4 * viewportHeight; // 4 paneles

  it('devuelve 0 antes de entrar en .journey-h', () => {
    expect(panoramaProgress(journeyTop, journeyTop, journeyHeight, viewportHeight)).toBe(0);
  });

  it('devuelve 1 al agotar el recorrido pineado', () => {
    const scrollY = journeyTop + (journeyHeight - viewportHeight);
    expect(panoramaProgress(scrollY, journeyTop, journeyHeight, viewportHeight)).toBe(1);
  });

  it('interpola linealmente a mitad de recorrido', () => {
    const scrollY = journeyTop + (journeyHeight - viewportHeight) / 2;
    expect(panoramaProgress(scrollY, journeyTop, journeyHeight, viewportHeight)).toBeCloseTo(0.5);
  });

  it('no divide por cero con un único panel (héroe solo)', () => {
    expect(panoramaProgress(journeyTop, journeyTop, viewportHeight, viewportHeight)).toBe(0);
  });
});
