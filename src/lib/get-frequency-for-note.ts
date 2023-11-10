import { noteToMIDINumber } from './note-to-midi-number';

const A4 = 440;
const A4_NOTE_NUMBER = 69;
const TWELFTH_ROOT_OF_TWO = Math.pow(2, 1 / 12);

export const getFrequency = (note: NoteWithOctave) => {
  const noteNumber = noteToMIDINumber(note);
  if (!noteNumber) return;

  // Calculate the frequency
  return A4 * Math.pow(TWELFTH_ROOT_OF_TWO, noteNumber - A4_NOTE_NUMBER);
};
