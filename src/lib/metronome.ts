export class Clock {
  public on: boolean = false;
  public currentBeat = 0;
  public beats = 4;
  public nextScheduledBeat: number | null = null;
  public interval: NodeJS.Timeout | null = null;

  constructor(
    public context: AudioContext,
    public onTick: (currentBeat: number, scheduledTime: number) => void,
    public bpm = 90,
  ) {}

  get secondsPerBeat() {
    return 60 / this.bpm;
  }

  public start() {
    this.on = true;
    this.nextScheduledBeat = this.context.currentTime + this.secondsPerBeat;

    if (this.on) return;
  }

  public stop() {
    this.on = false;
    this.nextScheduledBeat = null;
    this.currentBeat = 0;
    if (this.interval) clearTimeout(this.interval);
  }

  public tick = () => {
    if (!this.on) return;

    if (!this.nextScheduledBeat)
      this.nextScheduledBeat = this.context.currentTime + this.secondsPerBeat;

    this.onTick(this.currentBeat, this.nextScheduledBeat);
    this.incrementBeat();

    this.interval = setTimeout(this.tick, this.secondsPerBeat * 1000);
  };

  private incrementBeat() {
    this.currentBeat++;
    if (this.currentBeat >= this.beats) this.currentBeat = 1;
  }
}
