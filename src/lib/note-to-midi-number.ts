import { getAccidentalForNote } from './keys';
import { notesWithOctaves, parseNoteAndOctave } from './notes';

const notesToSemitones: Readonly<Record<Note, number>> = {
  'B#': 0,
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  'E#': 5,
  Fb: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
} as const;

export const noteToSemitone = (note: Note): number => {
  return notesToSemitones[note];
};

export const notesForSemitone = (semitone: number): Note[] => {
  return Object.keys(notesToSemitones).filter(
    (n) => notesToSemitones[n as Note] === semitone,
  ) as Note[];
};

export const noteToMidiNumber = (note: NoteWithOctave): number => {
  const { note: noteName, octave } = parseNoteAndOctave(note);

  const midiNumber = (octave + 1) * 12 + notesToSemitones[noteName];

  return midiNumber;
};

export const noteFromMidiNumber = (
  midiNumber: number,
  key: Note = 'C',
): NoteWithOctave => {
  const octave = Math.floor(midiNumber / 12) - 1;
  const note = midiNumber % 12;

  const noteName = Object.keys(notesToSemitones).find(
    (n) => notesToSemitones[n as Note] === note,
  ) as Note;

  return `${getAccidentalForNote(noteName, key)}${octave}` as NoteWithOctave;
};

export const midiNumbersToNotes = () => {
  const result: Record<number, NoteWithOctave[]> = {};

  for (const note of notesWithOctaves) {
    const midiNumber = noteToMidiNumber(note);
    if (!result[midiNumber]) result[midiNumber] = [];
    result[midiNumber].push(note);
  }

  return Object.entries(result);
};
