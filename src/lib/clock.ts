export class Clock {
  public on: boolean = false;
  public currentBeat = 0;
  public beatsPerMinute = 90;
  public beatsPerMeasure = 4;
  public nextScheduledBeat: number | null = null;
  public interval: NodeJS.Timeout | null = null;

  constructor(
    public context: AudioContext,
    public onTick: (currentBeat: number, scheduledTime: number) => void,
    options?: Partial<Clock>,
  ) {
    Object.assign(this, options);
  }

  get secondsPerBeat() {
    return 60 / this.beatsPerMinute;
  }

  public start() {
    if (this.on) return;

    this.on = true;
    this.currentBeat = 0;

    this.tick();
  }

  public stop() {
    this.on = false;
    this.nextScheduledBeat = null;
    if (this.interval) clearTimeout(this.interval);
  }

  public tick = () => {
    if (!this.on) return;

    if (!this.nextScheduledBeat) {
      this.nextScheduledBeat = this.context.currentTime;
    }

    this.incrementBeat();
    this.onTick(this.currentBeat, this.nextScheduledBeat);

    this.interval = setTimeout(this.tick, this.secondsPerBeat * 1000);
    this.nextScheduledBeat += this.secondsPerBeat;
  };

  private incrementBeat() {
    this.currentBeat++;
    if (this.currentBeat > this.beatsPerMeasure) this.currentBeat = 1;
  }
}
