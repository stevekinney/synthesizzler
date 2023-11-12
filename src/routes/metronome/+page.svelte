<script lang="ts">
  import { playNote } from '$lib/play';
  import { repeat } from '$lib/repeat';

  import Slider from '$components/slider.svelte';
  import ToggleButton from '$components/toggle-button.svelte';

  const context = new AudioContext();

  let currentBeat = 0;
  let isPlaying = false;

  let beatsPerMinute = 120;
  let beatsPerMeasure = 4;

  let interval: NodeJS.Timeout;

  $: secondsPerBeat = 60 / beatsPerMinute;

  const start = () => {
    currentBeat = 0;
    isPlaying = !isPlaying;
    playSound();
  };

  const stop = () => {
    clearTimeout(interval);
    isPlaying = !isPlaying;
  };

  const playSound = (scheduledTime = context.currentTime) => {
    currentBeat = ++currentBeat <= 4 ? currentBeat : 1;

    const note = currentBeat === 1 ? 'C5' : 'C4';

    playNote(context, note, scheduledTime, {
      duration: 0.1,
    });

    if (isPlaying) {
      const nextBeatTime = scheduledTime + secondsPerBeat;

      interval = setTimeout(() => {
        playSound(nextBeatTime);
      }, (nextBeatTime - context.currentTime) * 1000);
    }
  };
</script>

<div class="space-y-6">
  <dl>
    <dt>Playing</dt>
    <dd>{isPlaying ? 'Yes' : 'No'}</dd>
    <dt>Seconds Per Beat</dt>
    <dd>{secondsPerBeat}</dd>
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
