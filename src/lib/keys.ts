import { isFlatNote, isNaturalNote, isSharpNote } from './notes';

import { noteToSemitone, notesForSemitone } from './note-to-midi-number';

export const sharpKeys = ['G', 'D', 'A', 'E', 'B', 'F#', 'C#'];
export const flatKeys = ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb'];

export const keys = [...sharpKeys, ...flatKeys];

export const orderOfSharps: Note[] = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
export const orderOfFlats: Note[] = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

const sharpOrder: Note[] = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#'];
const flatOrder: Note[] = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb'];

export function getSharpForNote(note: Note): Note {
  if (isNaturalNote(note)) {
    return note;
  }

  const semitone = noteToSemitone(note);

  for (const n of notesForSemitone(semitone)) {
    if (isSharpNote(n)) return n;
  }

  return note;
}

export function getFlatForNote(note: Note): Note {
  if (isNaturalNote(note)) {
    return note;
  }

  const semitone = noteToSemitone(note);

  for (const n of notesForSemitone(semitone)) {
    if (isFlatNote(n)) return n;
  }

  return note;
}

export const getAccidentalsForKey = (key: Note): Note[] => {
  let accidentals: Note[] = [];

  if (sharpKeys.includes(key)) {
    const index = sharpKeys.indexOf(key);
    accidentals = sharpOrder.slice(0, index + 1);
  } else if (flatKeys.includes(key)) {
    const index = flatKeys.indexOf(key);
    accidentals = flatOrder.slice(0, index + 1);
  }

  return accidentals;
};

export const getAccidentalForNote = (key: Note, note: Note) => {
  const semitone = noteToSemitone(note);
  const notesInKey = getAccidentalsForKey(key);

  for (const n of notesInKey) {
    if (noteToSemitone(n) === semitone) return n;
  }

  if (sharpKeys.includes(key)) {
    return getSharpForNote(note);
  }

  if (flatKeys.includes(key)) {
    return getFlatForNote(note);
  }

  return note;
};
