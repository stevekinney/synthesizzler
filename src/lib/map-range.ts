export const mapRange = (
  value: number,
  min: number,
  max: number,
  targetMin: number,
  targetMax: number,
): number => {
  // First, we normalize the value within the current range
  const normalized = (value - min) / (max - min);

  // Then, we map the normalized value to the target range
  return normalized * (targetMax - targetMin) + targetMin;
};

export const mapToPannerRange = (value: number, min: number, max: number) => {
  return mapRange(value, min, max, -1, 1);
};

export const mapVideoToPannerRange = (value: number) => {
  return mapToPannerRange(value, 0, 480);
};
