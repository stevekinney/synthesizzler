import { getFrequency } from './get-frequency-for-note';

type PlayOptions = {
  duration?: number;
  waveType?: OscillatorType;
};

export const playFrequency = (
  context: AudioContext,
  frequency: number,
  { duration = 1, waveType = 'sine' }: PlayOptions = {},
) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.type = waveType;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0, context.currentTime);
  gain.gain.linearRampToValueAtTime(1, context.currentTime + duration / 100);

  oscillator.start();
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

  oscillator.stop(context.currentTime + duration);
};

export const playNote = (
  context: AudioContext,
  note: NoteWithOctave,
  options: PlayOptions = {},
) => {
  const frequency = getFrequency(note);
  playFrequency(context, frequency, options);
};
