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

export const isNoteWithOctave = (
  note: string | undefined,
): note is NoteWithOctave => {
  if (!note) return false;
  for (const n of noteWithOctave) {
    if (n === note) return true;
  }
  return false;
};

export const toNoteWithOctave = (
  note: Note,
  octave: Octave,
): NoteWithOctave => {
  return `${note}${octave}` as const;
};

export const withOctave = (note: Note, octave: Octave): NoteWithOctave =>
  `${note}${octave}` as const;

export const toNoteAndOctave = (noteWithOctave: NoteWithOctave) => {
  const note = noteWithOctave.slice(0, -1) as Note;
  const octave = parseInt(noteWithOctave.slice(-1), 10) as Octave;
  return { note, octave };
};
