import { describe, it, expect } from 'vitest';
import {
  isNote,
  isNoteWithOctave,
  toNoteWithOctave,
  parseNoteAndOctave,
} from './notes';

describe('isNote', () => {
  it('returns true for valid note', () => {
    expect(isNote('C')).toBe(true);
  });

  it('returns false for invalid note', () => {
    expect(isNote('X')).toBe(false);
  });
});

describe('isNoteWithOctave', () => {
  it('returns true for valid note', () => {
    expect(isNoteWithOctave('C4')).toBe(true);
  });

  it('returns false for a note without an octave', () => {
    expect(isNoteWithOctave('C')).toBe(false);
  });

  it('returns false for invalid note', () => {
    expect(isNoteWithOctave('X')).toBe(false);
  });
});

describe('toNoteWithOctave', () => {
  it('returns note with octave', () => {
    expect(toNoteWithOctave('C', 4)).toBe('C4');
  });
});

describe('parseNoteAndOctave', () => {
  it('returns note and octave', () => {
    expect(parseNoteAndOctave('C4')).toEqual({
      note: 'C',
      octave: 4,
    });
  });
});
