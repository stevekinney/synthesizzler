import { getFrequency } from './get-frequency-for-note';

type PlayOptions = {
  duration?: number;
  waveType?: OscillatorType;
};

export const playFrequency = (
  context: AudioContext,
  frequency: number,
  startTime: number = context.currentTime,
  { duration = 1, waveType = 'sine' }: PlayOptions = {},
) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.type = waveType;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(1, startTime + duration / 100);

  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
};

export const playNote = (
  context: AudioContext,
  note: NoteWithOctave,
  time: number = context.currentTime,
  options: PlayOptions = {},
) => {
  const frequency = getFrequency(note);
  playFrequency(context, frequency, time, options);
};
