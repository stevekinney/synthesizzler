<script lang="ts">
  import { currentNotes } from '$lib/current-notes';
  import Keyboard from '$components/keyboard.svelte';
  import Piano from '$components/piano.svelte';
  import { onDestroy, onMount } from 'svelte';

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

<div
  class="grid grid-cols-1 gap-10 xl:grid-rows-[3rem_auto] lg:grid-cols-[1fr_1fr]"
>
  <ul class="flex gap-4 lg:col-span-2 items-center">
    <h2 class="font-semibold">Current Notes</h2>
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
