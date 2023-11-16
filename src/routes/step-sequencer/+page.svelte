<script lang="ts">
  import { produce } from 'immer';

  import ToggleButton from '$components/toggle-button.svelte';

  import { Clock } from '$lib/clock';
  import { playNote } from '$lib/play';

  const notes: { note: NoteWithOctave; active: boolean }[] = [
    { note: 'A5', active: false },
    { note: 'G5', active: false },
    { note: 'E5', active: false },
    { note: 'C5', active: false },
    { note: 'A4', active: false },
    { note: 'G4', active: false },
    { note: 'E4', active: false },
    { note: 'C4', active: false },
    { note: 'A3', active: false },
    { note: 'G3', active: false },
    { note: 'E3', active: false },
    { note: 'C3', active: false },
  ];

  let isPlaying = false;
  let currentBeat = 0;

  let sequence = Array.from({ length: 16 }, (_, i) => {
    return notes;
  });

  const tick = (beat: number) => {
    currentBeat = beat;
    const currentStep = sequence[beat - 1];
    for (const { active, note } of currentStep) {
      if (active) {
        playNote(context, note, context.currentTime, {
          duration: clock.secondsPerBeat,
        });
      }
    }
  };

  const context = new AudioContext();

  const clock = new Clock(context, tick, {
    beatsPerMinute: 120,
    beatsPerMeasure: sequence.length,
  });

  const start = () => {
    clock.start();
    isPlaying = true;
  };

  const stop = () => {
    clock.stop();
    isPlaying = false;
    currentBeat = 0;
  };

  const handleClick = (step: number, note: number) => {
    sequence = produce(sequence, (draft) => {
      draft[step][note].active = !draft[step][note].active;
    });
  };
</script>

<svelte:head>
  <title>Step Sequencer</title>
</svelte:head>

<div class="mb-10">
  <ToggleButton
    on="Play"
    off="Stop"
    condition={isPlaying}
    on:click={isPlaying ? stop : start}
    class="w-full md:w-fit"
  />
</div>

<p
  class="portrait:block hidden bg-yellow-50 border-2 rounded-md border-yellow-100 p-4 my-10"
>
  <strong>Pro Tip</strong>: You probably want to turn your phone to landscape
  mode.
</p>

<div class="snap-mandatory snap-y h-screen md:h-fit w-full">
  <div class="grid grid-flow-col justify-center gap-px snap-start snap-always">
    {#each sequence as step, s}
      <div
        class="flex flex-col gap-px md:p-1 py-1 rounded"
        class:bg-yellow-400={s + 1 === currentBeat}
      >
        {#each step as button, b}
          <button
            on:click={() => handleClick(s, b)}
            class="rounded-none sm:border-2 border-0 p-px font-normal md:text-sm bg-purple-200 text-purple-700 border-purple-600 hover:bg-purple-300 w-6 h-6"
            class:active={button.active}
          >
            {button.note}
          </button>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .active {
    @apply bg-pink-600 border-pink-800 text-white hover:bg-pink-500 ring-pink-200;
  }
</style>
