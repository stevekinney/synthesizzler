export const notes: Readonly<Note[]> = [
  'C',
  'D',
  'E',
  'F',
  'G',
  'A',
  'B',
  'C#',
  'D#',
  'F#',
  'G#',
  'A#',
  'Db',
  'Eb',
  'Gb',
  'Ab',
  'Bb',
] as const;

export const octaves: Readonly<Octave[]> = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export const noteWithOctave = octaves.reduce<NoteWithOctave[]>(
  (result, octave) => {
    for (const note of notes) {
      result.push(`${note}${octave}`);
    }
    return result;
  },
  [],
);

export const isNote = (note: string | undefined): note is Note => {
  if (!note) return false;
  for (const n of notes) {
    if (n === note) return true;
  }
  return false;
};
