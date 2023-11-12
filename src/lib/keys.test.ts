import { describe, it, expect } from 'vitest';
import { getAccidentalForNote, getAccidentalsForKey } from './keys';
describe('getAccidentalsForKey', () => {
  it('returns empty array for invalid key', () => {
    expect(getAccidentalsForKey('X' as Note)).toEqual([]);
  });

  it('returns correct accidentals for sharp keys', () => {
    expect(getAccidentalsForKey('G')).toEqual(['F#']);
    expect(getAccidentalsForKey('D')).toEqual(['F#', 'C#']);
    expect(getAccidentalsForKey('A')).toEqual(['F#', 'C#', 'G#']);
    expect(getAccidentalsForKey('E')).toEqual(['F#', 'C#', 'G#', 'D#']);
    expect(getAccidentalsForKey('B')).toEqual(['F#', 'C#', 'G#', 'D#', 'A#']);
    expect(getAccidentalsForKey('F#')).toEqual([
      'F#',
      'C#',
      'G#',
      'D#',
      'A#',
      'E#',
    ]);
    expect(getAccidentalsForKey('C#')).toEqual([
      'F#',
      'C#',
      'G#',
      'D#',
      'A#',
      'E#',
      'B#',
    ]);
  });

  it('returns correct accidentals for flat keys', () => {
    expect(getAccidentalsForKey('F')).toEqual(['Bb']);
    expect(getAccidentalsForKey('Bb')).toEqual(['Bb', 'Eb']);
    expect(getAccidentalsForKey('Eb')).toEqual(['Bb', 'Eb', 'Ab']);
    expect(getAccidentalsForKey('Ab')).toEqual(['Bb', 'Eb', 'Ab', 'Db']);
    expect(getAccidentalsForKey('Db')).toEqual(['Bb', 'Eb', 'Ab', 'Db', 'Gb']);
    expect(getAccidentalsForKey('Gb')).toEqual([
      'Bb',
      'Eb',
      'Ab',
      'Db',
      'Gb',
      'Cb',
    ]);
    expect(getAccidentalsForKey('Cb')).toEqual([
      'Bb',
      'Eb',
      'Ab',
      'Db',
      'Gb',
      'Cb',
      'Fb',
    ]);
  });
});

describe('getAccidentalForNote', () => {
  it('returns a natural note neither sharp nor flat', () => {
    expect(getAccidentalForNote('C', 'C')).toEqual('C');
  });

  it('returns a sharp note for a sharp key', () => {
    expect(getAccidentalForNote('G', 'Gb')).toEqual('F#');
  });

  it('returns a flat note for a flat key', () => {
    expect(getAccidentalForNote('F', 'A#')).toEqual('Bb');
  });

  it('returns a natural note for a flat key', () => {
    expect(getAccidentalForNote('F', 'C')).toEqual('C');
    expect(getAccidentalForNote('C#', 'Ab')).toEqual('G#');
  });
});
