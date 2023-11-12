type Note = `${NaturalNote}${Accidental}`;

type NaturalNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

type Sharp = '#';
type Flat = 'b';
type Natural = '';

type Accidental = Sharp | Flat | Natural;

type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type NoteWithOctave = `${Note}${Octave}`;
