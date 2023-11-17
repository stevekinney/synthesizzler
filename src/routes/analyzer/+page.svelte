<script lang="ts">
  import Slider from '$components/slider.svelte';
  import ToggleButton from '$components/toggle-button.svelte';
  import { onDestroy } from 'svelte';

  const context = new AudioContext();
  const volume = context.createGain();
  const analyser = context.createAnalyser();
  const masterVolume = context.createGain();

  volume.connect(analyser).connect(masterVolume).connect(context.destination);

  let oscillator: OscillatorNode | null = null;

  let isPlaying = false;
  let waveType: OscillatorType = 'sine';
  let volumeLevel = 0.5;
  let frequency = 200;
  let masterVolumeLevel = 0.5;

  const start = () => {
    isPlaying = true;

    oscillator = context.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.connect(volume);
    oscillator.start();

    const ctx = canvas?.getContext('2d');

    if (ctx) draw(analyser, ctx);
  };

  const stop = () => {
    isPlaying = false;
    oscillator?.stop();
    oscillator?.disconnect();
    oscillator = null;
  };

  const resizeCanvas = () => {
    if (!canvas) return;
    const width = canvas?.parentElement?.offsetWidth;
    if (width) canvas.width = Math.min(width, window.innerWidth);
  };

  const draw = (analyser: AnalyserNode, ctx: CanvasRenderingContext2D) => {
    const buffer = new Float32Array(1024);
    const w = ctx.canvas.width;

    ctx.strokeStyle = '#00adef';
    ctx.setTransform(1, 0, 0, -1, 0, 100.5); // flip y-axis and translate to center
    ctx.lineWidth = 2;

    (function loop() {
      analyser.getFloatTimeDomainData(buffer);

      ctx.clearRect(0, -100, w, ctx.canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, buffer[0] * 90);

      for (let x = 2; x < w; x += 2) ctx.lineTo(x, buffer[x] * 90);

      ctx.stroke();

      if (isPlaying) requestAnimationFrame(loop);
    })();
  };

  let canvas: HTMLCanvasElement | null = null;

  $: volume.gain.value = volumeLevel;
  $: masterVolume.gain.value = masterVolumeLevel;
  $: if (oscillator) oscillator.type = waveType;
  $: if (oscillator) oscillator.frequency.value = frequency;
  $: if (canvas) resizeCanvas();

  onDestroy(stop);
</script>

<svelte:head>
  <title>Analyzer</title>
</svelte:head>

<svelte:window
  on:resize={() => {
    if (canvas) {
      const width = canvas.parentElement?.offsetWidth;
      if (width) canvas.width = width;
    }
  }}
/>

<div class="mb-10 flex gap-4 justify-between items-center">
  <ToggleButton
    class="flex-0"
    condition={isPlaying}
    on="Start"
    off="Stop"
    on:click={isPlaying ? stop : start}
  />
  <Slider
    class="w-full mb-0"
    label="Volume"
    bind:value={volumeLevel}
    min={0.01}
    max={1}
    step={0.01}
  />
  <Slider
    class="w-full mb-0"
    label="Frequency"
    bind:value={frequency}
    min={0}
    max={440}
  />
</div>

<Slider
  label="Master Volume"
  bind:value={masterVolumeLevel}
  min={0.01}
  max={1}
  step={0.01}
/>

<div class="flex flex-col sm:flex-row gap-2 my-6 justify-around">
  <label>
    <input type="radio" bind:group={waveType} value="sawtooth" />
    sawtooth
  </label>
  <label>
    <input type="radio" bind:group={waveType} value="sine" />
    sine
  </label>
  <label>
    <input type="radio" bind:group={waveType} value="square" />
    square
  </label>
  <label>
    <input type="radio" bind:group={waveType} value="triangle" />
    triangle
  </label>
</div>

<canvas
  id="playground"
  class="border-green-700 border-2 rounded bg-green-50 max-w-full"
  bind:this={canvas}
  width="600"
  height="200"
/>
