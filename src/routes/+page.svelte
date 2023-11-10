<script lang="ts">
  import { createOscillator } from '$lib/create-oscillator';

  let context: AudioContext;
  let oscillator: OscillatorNode | null;

  let frequency = 440;
  let detune = 0;
  let waveType: OscillatorType = 'sine';

  $: if (oscillator) {
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    oscillator.type = waveType;
  }

  let playPause = () => {
    if (!context) context = new AudioContext();
    if (oscillator) return oscillator.stop();

    oscillator = createOscillator(context);

    oscillator.type = waveType;
    oscillator.frequency.value = frequency;

    oscillator.connect(context.destination);
    oscillator.start();
  };
</script>

<dl>
  <dt>Context State</dt>
  <dd>{context?.state || 'Not Started'}</dd>
  <dt>Current Frequency</dt>
  <dd>{frequency}</dd>
</dl>

<label for="frequency">Frequency</label>
<input id="frequency" type="range" bind:value={frequency} min={110} max={880} />

<label for="detune">Detune</label>
<input id="detune" type="range" bind:value={detune} min={-100} max={100} />

<label for="wave-type">Wave Type</label>
<select id="wave-type" bind:value={waveType}>
  <option value="sine">Sine</option>
  <option value="square">Square</option>
  <option value="sawtooth">Sawtooth</option>
  <option value="triangle">Triangle</option>
</select>

<button role="switch" aria-checked={!!oscillator} on:click={playPause}>
  {oscillator ? 'Pause' : 'Play'}
</button>
