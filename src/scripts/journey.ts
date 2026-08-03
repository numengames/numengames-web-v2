/**
 * Motor de gamificación Nivel B.
 * Estado en el cliente (localStorage), sin backend ni cuentas.
 * El almacenamiento se inyecta para poder testearlo en Node.
 */

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface JourneyState {
  visited: string[];
  choices: Record<string, number>;
  eggs: string[];
}

export interface JourneySnapshot extends JourneyState {
  progress: number;
}

const KEY = 'numen.journey.v1';

const empty = (): JourneyState => ({ visited: [], choices: {}, eggs: [] });

/** Puntuación estilo aventura clásica («PTS 040/120»). */
export const SCORING = { phase: 10, choice: 15, egg: 25 } as const;

export function scoreOf(state: Pick<JourneyState, 'visited' | 'choices' | 'eggs'>): number {
  return (
    state.visited.length * SCORING.phase +
    Object.keys(state.choices).length * SCORING.choice +
    state.eggs.length * SCORING.egg
  );
}

export function maxScoreOf(totals: { phases: number; choices: number; eggs: number }): number {
  return (
    totals.phases * SCORING.phase + totals.choices * SCORING.choice + totals.eggs * SCORING.egg
  );
}

export function createJourney(storage: StorageLike, phaseIds: readonly string[]) {
  let state = load();

  function load(): JourneyState {
    try {
      const raw = storage.getItem(KEY);
      if (!raw) return empty();
      const parsed = JSON.parse(raw) as Partial<JourneyState>;
      return {
        visited: Array.isArray(parsed.visited) ? parsed.visited : [],
        choices: parsed.choices && typeof parsed.choices === 'object' ? parsed.choices : {},
        eggs: Array.isArray(parsed.eggs) ? parsed.eggs : [],
      };
    } catch {
      return empty();
    }
  }

  function persist() {
    try {
      storage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento no disponible: la narrativa sigue funcionando */
    }
    emit();
  }

  function emit() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent<JourneySnapshot>('journey:change', { detail: snapshot() }),
      );
    }
  }

  function progress(): number {
    if (phaseIds.length === 0) return 0;
    const seen = phaseIds.filter((id) => state.visited.includes(id)).length;
    return seen / phaseIds.length;
  }

  function snapshot(): JourneySnapshot {
    return { ...structuredCloneSafe(state), progress: progress() };
  }

  return {
    markVisited(id: string) {
      if (!state.visited.includes(id)) {
        state.visited.push(id);
        persist();
      }
    },
    hasVisited: (id: string) => state.visited.includes(id),
    choose(id: string, option: number) {
      if (state.choices[id] !== option) {
        state.choices[id] = option;
        persist();
      }
    },
    getChoice: (id: string): number | undefined => state.choices[id],
    unlockEgg(id: string) {
      if (!state.eggs.includes(id)) {
        state.eggs.push(id);
        persist();
      }
    },
    hasEgg: (id: string) => state.eggs.includes(id),
    reset() {
      state = empty();
      try {
        storage.removeItem(KEY);
      } catch {
        /* noop */
      }
      emit();
    },
    progress,
    snapshot,
  };
}

export type Journey = ReturnType<typeof createJourney>;

function structuredCloneSafe(s: JourneyState): JourneyState {
  return { visited: [...s.visited], choices: { ...s.choices }, eggs: [...s.eggs] };
}
