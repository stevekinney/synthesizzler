type Range = [number, number];

export const mapRange = (
  value: number,
  original: Range,
  target: Range,
): number => {
  const [minimum, maximum] = original;
  const [targetMin, targetMax] = target;
  const normalized = (value - minimum) / (maximum - minimum);
  return normalized * (targetMax - targetMin) + targetMin;
};
