/**
 * Audio 8-bit sintetizado con WebAudio: melodía original en bucle
 * (cuadrada + triángulo) y efectos. Sin archivos, sin autoplay:
 * todo arranca tras un gesto del usuario y respeta el silenciador.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

/* Compás 4/4 en corcheas; 0 = silencio. Composición propia (la dórico). */
const LEAD: number[] = [
  69, 0, 72, 0, 76, 0, 74, 72, 69, 0, 67, 0, 69, 0, 0, 0, 72, 0, 76, 0, 79, 0, 77, 76, 74, 0, 72, 0,
  74, 0, 0, 0, 69, 0, 72, 0, 76, 0, 74, 72, 69, 0, 67, 0, 64, 0, 67, 0, 69, 69, 0, 72, 0, 71, 0, 67,
  69, 0, 0, 0, 0, 0, 0, 0,
];
/* Blancas (una por cada 4 corcheas). */
const BASS: number[] = [45, 41, 48, 43, 45, 41, 40, 40];

const TEMPO = 118;
const STEP = 60 / TEMPO / 2; // corchea en segundos

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;

let enabled = true; // preferencia (persistida fuera de este módulo)
let unlocked = false; // ha habido gesto de usuario
let playing = false;
let schedulerId: number | undefined;
let nextTime = 0;
let step = 0;
let lastBlip = 0;

function ensureCtx(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const AC: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0.1;
    musicGain.connect(master);
    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.16;
    sfxGain.connect(master);
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) void ctx.suspend();
      else if (enabled && unlocked) void ctx.resume();
    });
    return ctx;
  } catch {
    return null;
  }
}

function note(
  freq: number,
  time: number,
  dur: number,
  type: OscillatorType,
  out: GainNode,
  peak = 1,
) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, time);
  env.gain.linearRampToValueAtTime(peak, time + 0.008);
  env.gain.exponentialRampToValueAtTime(0.001, time + dur);
  osc.connect(env);
  env.connect(out);
  osc.start(time);
  osc.stop(time + dur + 0.02);
}

function schedule() {
  if (!ctx || !musicGain) return;
  while (nextTime < ctx.currentTime + 0.14) {
    const i = step % LEAD.length;
    const lead = LEAD[i];
    if (lead > 0) note(midi(lead), nextTime, STEP * 1.7, 'square', musicGain, 0.55);
    if (i % 4 === 0) {
      const bass = BASS[(i / 4) % BASS.length];
      note(midi(bass), nextTime, STEP * 3.4, 'triangle', musicGain, 0.9);
    }
    nextTime += STEP;
    step += 1;
  }
}

function startMusic() {
  if (playing || !enabled || !unlocked) return;
  const c = ensureCtx();
  if (!c || !musicGain) return;
  void c.resume();
  playing = true;
  step = 0;
  nextTime = c.currentTime + 0.06;
  schedulerId = window.setInterval(schedule, 80);
}

function stopMusic() {
  playing = false;
  if (schedulerId) window.clearInterval(schedulerId);
  schedulerId = undefined;
}

function sfx(freqs: number[], durEach: number, type: OscillatorType = 'square', peak = 1) {
  if (!enabled || !unlocked) return;
  const c = ensureCtx();
  if (!c || !sfxGain) return;
  let t = c.currentTime + 0.001;
  for (const f of freqs) {
    note(f, t, durEach, type, sfxGain, peak);
    t += durEach * 0.9;
  }
}

export const audio = {
  get enabled() {
    return enabled;
  },
  /** Fija la preferencia (persistencia a cargo del llamante). */
  setEnabled(v: boolean) {
    enabled = v;
    if (!v) {
      stopMusic();
      if (ctx) void ctx.suspend();
    } else if (unlocked) {
      if (ctx) void ctx.resume();
      startMusic();
    }
  },
  /** Desbloquea el audio sin arrancar la música (gesto genérico). */
  unlockOnly() {
    unlocked = true;
  },
  /** Gesto principal («Empezar»): desbloquea y, si procede, arranca la música. */
  userGesture() {
    unlocked = true;
    if (enabled) startMusic();
  },
  /* ---- efectos ---- */
  blip() {
    const now = performance.now();
    if (now - lastBlip < 45) return;
    lastBlip = now;
    sfx([500 + Math.random() * 220], 0.035, 'square', 0.5);
  },
  confirm() {
    sfx([659, 880], 0.07, 'square', 0.8);
  },
  coin() {
    sfx([988, 1319], 0.06, 'square', 0.8);
  },
  chime() {
    sfx([880, 1175, 1760], 0.08, 'triangle', 1);
  },
  secret() {
    sfx([523, 587, 698, 932, 1047], 0.075, 'square', 0.85);
  },
};
