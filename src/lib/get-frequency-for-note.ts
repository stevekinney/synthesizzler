import { noteToMIDINumber } from './note-to-midi-number';
import { isNoteWithOctave, toNoteWithOctave } from './notes';

const A4 = 440;
const A4_NOTE_NUMBER = 69;
const TWELFTH_ROOT_OF_TWO = Math.pow(2, 1 / 12);

export function getFrequency(note: Note, octave?: Octave): number;
export function getFrequency(noteWithOctave: NoteWithOctave): number;
export function getFrequency(
  noteOrNoteWithOctave: NoteWithOctave | Note,
  octave: Octave = 3,
): number {
  const note = isNoteWithOctave(noteOrNoteWithOctave)
    ? noteOrNoteWithOctave
    : toNoteWithOctave(noteOrNoteWithOctave, octave || 3);

  const noteNumber = noteToMIDINumber(note);

  return A4 * Math.pow(TWELFTH_ROOT_OF_TWO, noteNumber - A4_NOTE_NUMBER);
}
