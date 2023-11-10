import { createOscillator } from '$lib/create-oscillator';
import { getFrequency } from '$lib/get-frequency-for-note';

let context: AudioContext | null = null;

export type Toggle = ReturnType<typeof createToggle>;

const createToggle = (gainNode: GainNode) => (on: boolean) => {
  console.log({ on });
  gainNode.gain.value = on ? 1 : 0;
};

const oscillators = new Map<Note, Toggle>();

export const getOscillator = (note: Note): Toggle => {
  if (!context) context = new AudioContext();

  let toggle = oscillators.get(note);
  if (toggle) return toggle;

  const oscillator = createOscillator(context);
  oscillator.frequency.value = getFrequency(`${note}3`)!;

  const gainNode = context.createGain();
  gainNode.gain.value = 0;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  toggle = createToggle(gainNode);

  oscillators.set(note, toggle);
  // oscillator.start();

  return toggle;
};
