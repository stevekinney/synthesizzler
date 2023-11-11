<script lang="ts">
  import type { Synthesizer } from '../routes/keys/create-synthesizer';
  import { isNote } from '$lib/notes';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let currentNotes: Synthesizer;

  const getNoteForElement = (element: HTMLElement): Note | undefined => {
    const note = element.dataset.note;
    if (!isNote(note)) return;
    return note;
  };

  const pause = (event: Event) => {
    pauseNote(event);
    event.target?.removeEventListener('mouseleave', pause);
  };

  const playNote = (event: Event) => {
    event.preventDefault();

    const note = getNoteForElement(event.target as HTMLElement);

    if (!isNote) return;

    dispatch('play', note);

    if (event.type === 'mousedown') {
      event.target?.addEventListener('mouseleave', pause);
      event.target?.addEventListener('mouseup', pause);
    }

    if (event.type === 'keydown') {
      event.target?.addEventListener('keyup', pause);
    }
  };

  const pauseNote = (event: Event) => {
    const note = getNoteForElement(event.target as HTMLElement);
    if (note) dispatch('pause', note);
  };
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 400">
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('B')}
    d="M480 0h80v400h-80z"
    data-note="B"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('A')}
    d="M400 0h80v400h-80z"
    data-note="A"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('G')}
    d="M320 0h80v400h-80z"
    data-note="G"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('F')}
    d="M240 0h80v400h-80z"
    data-note="F"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('E')}
    d="M160 0h80v400h-80z"
    data-note="E"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('D')}
    d="M80 0h80v400H80z"
    data-note="D"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-50 hover:fill-purple-100 stroke-purple-900 outline-none"
    class:active={$currentNotes.includes('C')}
    d="M0 0h80v400H0z"
    data-note="C"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-600 outline-none hover:fill-purple-700 stroke-purple-700"
    class:active={$currentNotes.includes('A#')}
    d="M460 0h40v280h-40z"
    data-note="A#"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-600 outline-none hover:fill-purple-700 stroke-purple-700"
    class:active={$currentNotes.includes('G#')}
    d="M380 0h40v280h-40z"
    data-note="G#"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-600 outline-none hover:fill-purple-700 stroke-purple-700"
    class:active={$currentNotes.includes('F#')}
    d="M300 0h40v280h-40z"
    data-note="F#"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-600 outline-none hover:fill-purple-700 stroke-purple-700"
    class:active={$currentNotes.includes('D#')}
    d="M140 0h40v280h-40z"
    data-note="D#"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
  <path
    class="fill-purple-600 outline-none hover:fill-purple-700 stroke-purple-700"
    class:active={$currentNotes.includes('C#')}
    d="M60 0h40v280H60z"
    data-note="C#"
    on:mousedown={playNote}
    on:keydown={playNote}
    role="button"
    tabindex="0"
  />
</svg>

<style lang="postcss">
  .active {
    @apply fill-purple-400;
  }
</style>
