export const createOscillator = (context: AudioContext) => {
  let oscillator: OscillatorNode | null = context.createOscillator();

  oscillator.connect(context.destination);

  oscillator.addEventListener('ended', function cleanup() {
    if (!oscillator) return;

    oscillator.stop();
    oscillator.disconnect();
    oscillator.removeEventListener('ended', cleanup);

    oscillator = null;
  });

  return oscillator;
};
