<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  import { currentNotes } from '$lib/current-notes';

  import Keyboard from '$components/keyboard.svelte';
  import Piano from '$components/piano.svelte';
  import { notes } from '$lib/notes';
  import { getOscillator } from './oscillators';
  import { get } from 'svelte/store';

  const pauseOnBlur = () => {
    currentNotes.clear();
  };

  onMount(() => {
    document.addEventListener('blur', pauseOnBlur);
  });

  onDestroy(() => {
    document.removeEventListener('blur', pauseOnBlur);
  });

  $: {
    for (const note of notes) {
      getOscillator(note)($currentNotes.includes(note));
    }
  }
</script>

<div
  class="grid grid-cols-1 gap-10 xl:grid-rows-[3rem_auto] lg:grid-cols-[1fr_1fr]"
>
  <ul class="flex gap-4 lg:col-span-2 items-center">
    <p class="font-semibold">Current Notes</p>
    {#each $currentNotes as note}
      <li class="px-4 py-2 border-2 rounded border-yellow-300 bg-yellow-100">
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
