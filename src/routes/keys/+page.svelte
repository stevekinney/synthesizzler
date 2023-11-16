<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { createSynthesizer } from './create-synthesizer';

  const context = new AudioContext();

  const currentNotes = createSynthesizer(context);

  import Keyboard from './keyboard.svelte';
  import Piano from './piano.svelte';

  const pauseOnBlur = () => {
    currentNotes.clear();
  };

  onMount(() => {
    document.addEventListener('blur', pauseOnBlur);
  });

  onDestroy(() => {
    document.removeEventListener('blur', pauseOnBlur);
  });
</script>

<svelte:head>
  <title>Keyboard</title>
</svelte:head>

<div
  class="grid grid-cols-1 gap-10 xl:grid-rows-[3rem_auto] lg:grid-cols-[1fr_1fr]"
>
  <ul
    class="flex gap-1 sm:gap-2 lg:col-span-2 items-center h-10 md:h-12 bg-yellow-50 rounded p-2 border-2 border-yellow-100"
  >
    <p class="font-semibold whitespace-nowrap sr-only sm:not-sr-only">
      Current Notes
    </p>
    {#each $currentNotes as note}
      <li
        class="px-2 sm:px-4 sm:py-2 border-2 rounded border-yellow-300 bg-yellow-100"
      >
        {note}
      </li>
    {/each}
  </ul>

  <Piano
    {currentNotes}
    on:play={(event) => currentNotes.add(event.detail)}
    on:pause={(event) => currentNotes.remove(event.detail)}
  />

  <Keyboard
    {currentNotes}
    on:play={(event) => currentNotes.add(event.detail)}
    on:pause={(event) => currentNotes.remove(event.detail)}
  />
</div>
