export const mapRange = (
  value: number,
  min: number,
  max: number,
  targetMin: number,
  targetMax: number,
): number => {
  const normalized = (value - min) / (max - min);
  return normalized * (targetMax - targetMin) + targetMin;
};
