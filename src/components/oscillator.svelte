<script lang="ts">
  const context = new AudioContext();
  const volume = context.createGain();

  volume.connect(context.destination);

  let oscillator: OscillatorNode | null;

  let frequency = 440;
  let detune = 0;
  let waveType: OscillatorType = 'sine';
  let volumeLevel = 0.5;

  $: if (oscillator) {
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    oscillator.type = waveType;
  }

  $: volume.gain.value = volumeLevel;

  const stop = () => {
    if (oscillator) {
      oscillator.stop();
      oscillator = null;
    }
  };

  let playPause = () => {
    if (oscillator) return stop();

    oscillator = context.createOscillator();

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    oscillator.connect(volume);
    oscillator.start();
  };
</script>

<div class="space-y-4">
  <dl>
    <dt>Context State</dt>
    <dd class="capitalize">{context?.state || 'Not Started'}</dd>
    <dt>Current Frequency</dt>
    <dd>{frequency}</dd>
  </dl>

  <p>
    <label for="frequency"
      >Frequency <span class="font-thin">({frequency})</span></label
    >
    <input
      id="frequency"
      type="range"
      bind:value={frequency}
      min={110}
      max={880}
    />
  </p>

  <p>
    <label for="detune">Detune <span class="font-thin">({detune})</span></label>
    <input id="detune" type="range" bind:value={detune} min={-100} max={100} />
  </p>

  <p>
    <label for="volume">
      Volume <span class="font-thin">({volumeLevel})</span>
    </label>
    <input
      id="volume"
      type="range"
      bind:value={volumeLevel}
      min={0}
      max={1}
      step={0.25}
    />
  </p>

  <p>
    <label for="wave-type">Wave Type</label>
    <select id="wave-type" bind:value={waveType}>
      <option value="sine">Sine</option>
      <option value="square">Square</option>
      <option value="sawtooth">Sawtooth</option>
      <option value="triangle">Triangle</option>
    </select>
  </p>

  <button
    class="w-full"
    role="switch"
    aria-checked={!!oscillator}
    on:click={playPause}
  >
    {oscillator ? 'Pause' : 'Play'}
  </button>
</div>
