/**
 * Motor de reserva del scroll (ADR 0006).
 * Progreso 0–1 puro, sin DOM, para navegadores sin `animation-timeline`
 * nativo. `init.ts` lo escribe en las variables CSS --thread-p/--pan-p.
 */

function clampUnit(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/** Progreso 0–1 del scroll de toda la página (para --thread-p). */
export function threadProgress(
  scrollY: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const max = scrollHeight - clientHeight;
  if (max <= 0) return 0;
  return clampUnit(scrollY / max);
}

/** Progreso 0–1 del recorrido panorámico dentro de .journey-h (para --pan-p). */
export function panoramaProgress(
  scrollY: number,
  journeyTop: number,
  journeyHeight: number,
  viewportHeight: number,
): number {
  const max = journeyHeight - viewportHeight;
  if (max <= 0) return 0;
  return clampUnit((scrollY - journeyTop) / max);
}
