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

export const isNote = (note: string | undefined): note is Note => {
  if (!note) return false;
  for (const n of notes) {
    if (n === note) return true;
  }
  return false;
};
