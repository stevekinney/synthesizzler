<script lang="ts">
  import Select from '../../components/select.svelte';
  import Slider from '../../components/slider.svelte';
  import ToggleButton from '../../components/toggle-button.svelte';

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

  <Slider label="Frequency" bind:value={frequency} min={220} max={880} />
  <Slider label="Detune" bind:value={detune} min={-100} max={100} />
  <Slider
    label="Volume"
    bind:value={volumeLevel}
    min={0.01}
    max={1}
    step={0.01}
  />

  <Select label="Wave Type" bind:value={waveType}>
    <option value="sine">Sine</option>
    <option value="square">Square</option>
    <option value="sawtooth">Sawtooth</option>
    <option value="triangle">Triangle</option>
  </Select>

  <ToggleButton
    class="w-full"
    on="Play"
    off="Pause"
    condition={!!oscillator}
    on:click={playPause}
  />
</div>
