<script lang="ts">
  import type { Synthesizer } from './create-synthesizer';
  import { isNote } from '$lib/notes';
  import { onMount, onDestroy } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let currentNotes: Synthesizer;

  const pause = (event: KeyboardEvent) => {
    const note = getNoteForKey(event.key);
    if (!isNote(note)) return;
    dispatch('pause', note);
  };

  const getNoteForKey = (key: string): Note | undefined => {
    const element = document.querySelector(
      `[data-key="${key.toLowerCase()}"]`,
    ) as HTMLElement | null;

    const note = element?.dataset.note;

    if (!isNote(note)) return;

    return note;
  };

  const playNote = (event: KeyboardEvent) => {
    const key = event.key;
    const note = getNoteForKey(key);

    if (!note) return;
    if ($currentNotes.includes(note)) return;

    dispatch('play', note);
  };

  onMount(() => {
    document.addEventListener('keydown', playNote);
    document.addEventListener('keyup', pause);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', playNote);
    document.addEventListener('keyup', pause);
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 206">
  <g stroke="#636462" stroke-linejoin="round" stroke-width="1">
    <path
      class="character"
      d="M37 31c0 2-2 4-4 4H5c-3 0-5-2-5-4V5c0-2 2-4 5-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M79 31c0 2-2 4-4 4H46c-2 0-4-2-4-4V5c0-2 2-4 4-4h29c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M121 31c0 2-2 4-5 4H88c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
    />
    <path
      class="character"
      d="M162 31c0 2-2 4-4 4h-28c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M204 31c0 2-2 4-4 4h-28c-3 0-5-2-5-4V5c0-2 2-4 5-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M246 31c0 2-2 4-4 4h-29c-2 0-4-2-4-4V5c0-2 2-4 4-4h29c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M288 31c0 2-2 4-5 4h-28c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
    />
    <path
      class="character"
      d="M329 31c0 2-2 4-4 4h-28c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M371 31c0 2-2 4-4 4h-28c-3 0-4-2-4-4V5c0-2 1-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M413 31c0 2-2 4-4 4h-29c-2 0-4-2-4-4V5c0-2 2-4 4-4h29c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M455 31c0 2-2 4-5 4h-28c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
    />
    <path
      class="character"
      d="M496 31c0 2-2 4-4 4h-28c-2 0-4-2-4-4V5c0-2 2-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M538 31c0 2-2 4-4 4h-28c-3 0-4-2-4-4V5c0-2 1-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M98 72c0 2-2 4-4 4H66c-3 0-4-2-4-4V46c0-2 1-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('C#')}
      d="M140 72c0 2-2 4-4 4h-28c-3 0-5-2-5-4V46c0-2 2-4 5-4h28c2 0 4 2 4 4v26Z"
      data-key="w"
      data-note="C#"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('D#')}
      d="M182 72c0 2-2 4-5 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
      data-key="e"
      data-note="D#"
    />
    <path
      class="character"
      d="M223 72c0 2-1 4-4 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c3 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('F#')}
      d="M265 72c0 2-2 4-4 4h-28c-3 0-4-2-4-4V46c0-2 1-4 4-4h28c2 0 4 2 4 4v26Z"
      data-key="t"
      data-note="F#"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('G#')}
      d="M307 72c0 2-2 4-4 4h-28c-3 0-5-2-5-4V46c0-2 2-4 5-4h28c2 0 4 2 4 4v26Z"
      data-key="y"
      data-note="G#"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('A#')}
      d="M349 72c0 2-2 4-4 4h-29c-2 0-4-2-4-4V46c0-2 2-4 4-4h29c2 0 4 2 4 4v26Z"
      data-key="u"
      data-note="A#"
    />
    <path
      class="character"
      d="M390 72c0 2-1 4-4 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c3 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M432 72c0 2-2 4-4 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M474 72c0 2-2 4-4 4h-28c-3 0-5-2-5-4V46c0-2 2-4 5-4h28c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M516 72c0 2-2 4-4 4h-29c-2 0-4-2-4-4V46c0-2 2-4 4-4h29c2 0 4 2 4 4v26Z"
    />
    <path
      class="character"
      d="M558 72c0 2-2 4-5 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
    />
    <path
      class="character"
      d="M599 72c0 2-2 4-5 4h-28c-2 0-4-2-4-4V46c0-2 2-4 4-4h28c3 0 5 2 5 4v26Z"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('C')}
      d="M109 113c0 2-2 4-4 4H77c-3 0-5-2-5-4V87c0-3 2-4 5-4h28c2 0 4 1 4 4v26Z"
      data-key="a"
      data-note="C"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('D')}
      d="M151 113c0 2-2 4-4 4h-29c-2 0-4-2-4-4V87c0-3 2-4 4-4h29c2 0 4 1 4 4v26Z"
      data-key="s"
      data-note="D"
      data-active={$currentNotes.includes('D')}
    />
    <path
      class="character"
      class:active={$currentNotes.includes('E')}
      d="M193 113c0 2-2 4-5 4h-28c-2 0-4-2-4-4V87c0-3 2-4 4-4h28c3 0 5 1 5 4v26Z"
      data-key="d"
      data-note="E"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('F')}
      d="M234 113c0 2-2 4-4 4h-28c-2 0-4-2-4-4V87c0-3 2-4 4-4h28c2 0 4 1 4 4v26Z"
      data-key="f"
      data-note="F"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('G')}
      d="M276 113c0 2-2 4-4 4h-28c-3 0-5-2-5-4V87c0-3 2-4 5-4h28c2 0 4 1 4 4v26Z"
      data-key="g"
      data-note="G"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('A')}
      d="M318 113c0 2-2 4-4 4h-29c-2 0-4-2-4-4V87c0-3 2-4 4-4h29c2 0 4 1 4 4v26Z"
      data-key="h"
      data-note="A"
    />
    <path
      class="character"
      class:active={$currentNotes.includes('B')}
      d="M360 113c0 2-2 4-5 4h-28c-2 0-4-2-4-4V87c0-3 2-4 4-4h28c3 0 5 1 5 4v26Z"
      data-key="j"
      data-note="B"
    />
    <path
      class="character"
      d="M401 113c0 2-2 4-4 4h-28c-2 0-4-2-4-4V87c0-3 2-4 4-4h28c2 0 4 1 4 4v26Z"
    />
    <path
      class="character"
      d="M443 113c0 2-2 4-4 4h-28c-3 0-4-2-4-4V87c0-3 1-4 4-4h28c2 0 4 1 4 4v26Z"
    />
    <path
      class="character"
      d="M485 113c0 2-2 4-4 4h-29c-2 0-4-2-4-4V87c0-3 2-4 4-4h29c2 0 4 1 4 4v26Z"
    />
    <path
      class="character"
      d="M527 113c0 2-2 4-5 4h-28c-2 0-4-2-4-4V87c0-3 2-4 4-4h28c3 0 5 1 5 4v26Z"
    />
    <path
      class="character"
      d="M128 154c0 2-2 4-4 4H96c-2 0-4-2-4-4v-26c0-3 2-5 4-5h28c2 0 4 2 4 5v26Z"
    />
    <path
      class="character"
      d="M170 154c0 2-2 4-4 4h-28c-3 0-4-2-4-4v-26c0-3 1-5 4-5h28c2 0 4 2 4 5v26Z"
    />
    <path
      class="character"
      d="M212 154c0 2-2 4-4 4h-29c-2 0-4-2-4-4v-26c0-3 2-5 4-5h29c2 0 4 2 4 5v26Z"
    />
    <path
      class="character"
      d="M254 154c0 2-2 4-5 4h-28c-2 0-4-2-4-4v-26c0-3 2-5 4-5h28c3 0 5 2 5 5v26Z"
    />
    <path
      class="character"
      d="M295 154c0 2-1 4-4 4h-28c-2 0-4-2-4-4v-26c0-3 2-5 4-5h28c3 0 4 2 4 5v26Z"
    />
    <path
      class="character"
      d="M337 154c0 2-2 4-4 4h-28c-3 0-4-2-4-4v-26c0-3 1-5 4-5h28c2 0 4 2 4 5v26Z"
    />
    <path
      class="character"
      d="M379 154c0 2-2 4-4 4h-28c-3 0-5-2-5-4v-26c0-3 2-5 5-5h28c2 0 4 2 4 5v26Z"
    />
    <path
      class="modifier"
      d="M421 154c0 2-2 4-5 4h-28c-2 0-4-2-4-4v-26c0-3 2-5 4-5h28c3 0 5 2 5 5v26Z"
    />
    <path
      class="modifier"
      d="M462 154c0 2-1 4-4 4h-28c-2 0-4-2-4-4v-26c0-3 2-5 4-5h28c3 0 4 2 4 5v26Z"
    />
    <path
      class="modifier"
      d="M504 154c0 2-2 4-4 4h-28c-3 0-4-2-4-4v-26c0-3 1-5 4-5h28c2 0 4 2 4 5v26Z"
    />
    <path
      class="modifier"
      d="M58 72c0 2-1 4-4 4H5c-2 0-4-2-4-4V46c0-2 2-4 4-4h49c3 0 4 2 4 4v26Z"
    />
    <path
      class="modifier"
      d="M69 113c0 2-2 4-4 4H5c-2 0-4-2-4-4V87c0-3 2-4 4-4h60c2 0 4 1 4 4v26Z"
    />
    <path
      class="modifier"
      d="M599 113c0 2-2 4-5 4h-60c-2 0-4-2-4-4V87c0-3 2-4 4-4h60c3 0 5 1 5 4v26Z"
    />
    <path
      class="modifier"
      d="M599 31c0 2-2 4-5 4h-49c-2 0-4-2-4-4V5c0-2 2-4 4-4h49c3 0 5 2 5 4v26Z"
    />
    <path
      class="modifier"
      d="M89 154c0 2-2 4-4 4H5c-2 0-4-2-4-4v-26c0-3 2-5 4-5h80c2 0 4 2 4 5v26ZM599 154c0 2-2 4-5 4h-80c-2 0-4-2-4-4v-26c0-3 2-5 4-5h80c3 0 5 2 5 5v26Z"
    />
    <path
      class="modifier"
      d="M58 201c0 2-2 4-4 4H5c-2 0-4-2-4-4v-33c0-2 2-4 4-4h49c2 0 4 2 4 4v33Z"
    />
    <path
      class="modifier"
      d="M110 201c0 2-2 4-4 4H66c-2 0-4-2-4-4v-33c0-2 2-4 4-4h40c2 0 4 2 4 4v33Z"
    />
    <path
      class="modifier"
      d="M172 201c0 2-2 4-5 4h-49c-2 0-4-2-4-4v-33c0-2 2-4 4-4h49c3 0 5 2 5 4v33Z"
    />
    <path
      class="modifier"
      d="M422 201c0 2-2 4-5 4H181c-3 0-5-2-5-4v-33c0-2 2-4 5-4h236c3 0 5 2 5 4v33Z"
    />
    <path
      class="modifier"
      d="M483 201c0 2-2 4-4 4h-49c-2 0-4-2-4-4v-33c0-2 2-4 4-4h49c2 0 4 2 4 4v33Z"
    />
    <path
      class="modifier"
      d="M536 201c0 2-2 4-5 4h-39c-3 0-5-2-5-4v-33c0-2 2-4 5-4h39c3 0 5 2 5 4v33Z"
    />
    <path
      class="modifier"
      d="M599 201c0 2-2 4-5 4h-49c-2 0-4-2-4-4v-33c0-2 2-4 4-4h49c3 0 5 2 5 4v33Z"
    />
  </g>
</svg>

<style lang="postcss">
  .character {
    @apply fill-cyan-50 stroke-cyan-600 data-[key]:fill-purple-300 data-[note$="#"]:fill-purple-600;
    &.active {
      @apply fill-purple-400;
    }
  }

  .modifier {
    @apply fill-white stroke-cyan-600;
  }
</style>
