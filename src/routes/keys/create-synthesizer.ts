import { derived, writable } from 'svelte/store';
import { getFrequency } from '../../lib/get-frequency-for-note';

export type Synthesizer = ReturnType<typeof createSynthesizer>;

type OscillatorAndGain = {
  oscillator: OscillatorNode;
  gain: GainNode;
};

const startOscillator = (
  context: AudioContext,
  note: Note,
  octave: Octave,
): OscillatorAndGain => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.frequency.value = getFrequency(note, octave);
  gain.gain.value = 0.01;

  oscillator.connect(gain);
  gain.connect(context.destination);

  gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.1);
  oscillator.start();

  return { oscillator, gain };
};

const stopOscillator = (
  context: AudioContext,
  { oscillator, gain }: OscillatorAndGain,
): null => {
  const duration = 0.3;
  const endTime = context.currentTime + duration;

  gain.gain.linearRampToValueAtTime(0.001, endTime);
  oscillator.stop(endTime);

  return null;
};

export const createSynthesizer = (
  context: AudioContext,
  octave: Octave = 4,
) => {
  const notes = writable<Partial<Record<Note, OscillatorAndGain | null>>>({});

  const add = (note: Note) => {
    notes.update((currentNotes) => {
      if (currentNotes[note]) return currentNotes;

      const oscillator = startOscillator(context, note, octave);

      return {
        ...currentNotes,
        [note]: oscillator,
      };
    });
  };

  const remove = (note: Note) => {
    notes.update((currentNotes) => {
      const oscillator = currentNotes[note];

      if (!oscillator) return currentNotes;

      return {
        ...currentNotes,
        [note]: stopOscillator(context, oscillator),
      };
    });
  };

  const clear = () => {
    notes.update((currentNotes) => {
      Object.values(currentNotes).forEach((oscillator) => {
        if (oscillator) stopOscillator(context, oscillator);
      });

      return {};
    });
  };

  const active = derived(notes, ($notes) => {
    const keys = Object.keys($notes) as Note[];
    return keys.filter((note) => !!$notes[note as Note]);
  });

  return {
    add,
    remove,
    clear,
    subscribe: active.subscribe,
  };
};
