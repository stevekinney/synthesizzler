import { derived, writable } from 'svelte/store';
import { getFrequency } from '../../lib/get-frequency-for-note';

export type Synthesizer = ReturnType<typeof createSynthesizer>;

const startOscillator = (
  context: AudioContext,
  note: Note,
  octave: Octave,
): OscillatorNode => {
  const oscillator = context.createOscillator();

  oscillator.frequency.value = getFrequency(note, octave);

  oscillator.connect(context.destination);
  oscillator.start();

  return oscillator;
};

const stopOscillator = (oscillator: OscillatorNode): null => {
  oscillator.stop();
  oscillator.disconnect();
  return null;
};

export const createSynthesizer = (
  context: AudioContext,
  octave: Octave = 4,
) => {
  const notes = writable<Partial<Record<Note, OscillatorNode | null>>>({});

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
        [note]: stopOscillator(oscillator),
      };
    });
  };

  const clear = () => {
    notes.update((currentNotes) => {
      Object.values(currentNotes).forEach((oscillator) => {
        if (oscillator) stopOscillator(oscillator);
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
