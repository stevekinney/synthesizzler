import { describe, it, expect } from 'vitest';
import {
  noteToSemitone,
  notesForSemitone,
  noteToMidiNumber,
} from './note-to-midi-number';

describe('noteToSemitone', () => {
  it('returns semitone for a natural note', () => {
    expect(noteToSemitone('C')).toEqual(0);
  });

  it('returns semitone for a sharp note', () => {
    expect(noteToSemitone('C#')).toEqual(1);
  });

  it('returns semitone for a flat note', () => {
    expect(noteToSemitone('Db')).toEqual(1);
  });
});

describe('notesForSemitone', () => {
  it('returns natural note for a semitone', () => {
    expect(notesForSemitone(0)).toEqual(['B#', 'C']);
  });

  it('returns sharp note for a semitone', () => {
    expect(notesForSemitone(1)).toEqual(['C#', 'Db']);
  });
});

describe('noteToMidiNumber', () => {
  it('returns midi number for a natural note', () => {
    expect(noteToMidiNumber('C4')).toEqual(60);
  });

  it('returns midi number for a sharp note', () => {
    expect(noteToMidiNumber('C#4')).toEqual(61);
  });

  it('returns midi number for a flat note', () => {
    expect(noteToMidiNumber('Db4')).toEqual(61);
  });
});
