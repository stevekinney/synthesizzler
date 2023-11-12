import { describe, it, expect } from 'vitest';
import { mapRange } from './map-range';

describe('mapRange', () => {
  it('maps a range with integers as the original range', () => {
    expect(mapRange(5, [0, 10], [0, 1])).toBe(0.5);
  });

  it('maps range with decimals as the original range', () => {
    expect(mapRange(0.5, [0, 1], [0, 10])).toBe(5);
  });
});
