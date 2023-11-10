import { isNote } from './notes';

const notesToSemitones: Readonly<Record<Note, number>> = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
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
} as const;

export function noteToMIDINumber(note: NoteWithOctave) {
  // Extract the note and octave from the input
  const match = note.match(/([A-G#b]+)(\d+)/);

  if (!match) {
    throw new Error('Invalid note format');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, noteName, octave] = match;

  if (!isNote(noteName)) return;

  const midiNumber =
    (parseInt(octave, 10) + 1) * 12 + notesToSemitones[noteName];

  return midiNumber;
}
