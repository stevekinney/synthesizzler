type Note =
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'A'
  | 'B'
  | 'C#'
  | 'D#'
  | 'F#'
  | 'G#'
  | 'A#'
  | 'Db'
  | 'Eb'
  | 'Gb'
  | 'Ab'
  | 'Bb';

type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type NoteWithOctave = `${Note}${Octave}`;

type OptionalNote = Note | '';
