<script lang="ts">
  import { playNote } from '$lib/play';
  import { repeat } from '$lib/repeat';
  import { Clock } from '$lib/clock';

  import Slider from '$components/slider.svelte';
  import ToggleButton from '$components/toggle-button.svelte';

  const context = new AudioContext();

  let currentBeat = 0;
  let isPlaying = false;

  let beatsPerMinute = 120;
  let beatsPerMeasure = 4;

  const start = () => {
    clock.start();
    currentBeat = clock.currentBeat;
    isPlaying = clock.on;
  };

  const stop = () => {
    clock.stop();
    isPlaying = clock.on;
    currentBeat = clock.currentBeat;
  };

  const playSound = (beat: number, scheduledTime = context.currentTime) => {
    const note = beat === 1 ? 'C5' : 'C4';
    currentBeat = beat;

    playNote(context, note, scheduledTime, {
      duration: 0.1,
    });
  };

  const clock = new Clock(context, playSound, {
    beatsPerMinute,
    beatsPerMeasure,
  });

  $: {
    clock.beatsPerMinute = beatsPerMinute;
    clock.beatsPerMeasure = beatsPerMeasure;
  }
</script>

<svelte:head>
  <title>Metronome</title>
</svelte:head>

<div class="space-y-6">
  <dl>
    <dt>Playing</dt>
    <dd>{isPlaying ? 'Yes' : 'No'}</dd>
    <dt>Current Beat</dt>
    <dd>{currentBeat}</dd>
  </dl>

  <Slider
    label="Beats Per Minute"
    bind:value={beatsPerMinute}
    min={60}
    max={220}
  />

  <ToggleButton
    on="Start"
    off="Stop"
    on:click={isPlaying ? stop : start}
    condition={isPlaying}
  />

  <section class="flex flex-col sm:flex-row gap-2">
    {#each repeat(beatsPerMeasure) as beat}
      <div
        class="bg-indigo-200 h-10 w-full border-2 border-indigo-300"
        class:bg-indigo-600={beat === currentBeat}
      />
    {/each}
  </section>
</div>
