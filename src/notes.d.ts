type Note = NaturalNote | SharpNote | FlatNote;
type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
type SharpNote = 'C#' | 'D#' | 'F#' | 'G#' | 'A#';
type FlatNote = 'Db' | 'Eb' | 'Gb' | 'Ab' | 'Bb';

type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type NoteWithOctave = `${Note}${Octave}`;
