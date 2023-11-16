<script lang="ts">
  import { midiNumbersToNotes } from '$lib/note-to-midi-number';
  import { playNote } from '$lib/play';

  const context = new AudioContext();
  let timeout: NodeJS.Timeout;

  const validNotes = midiNumbersToNotes().slice(40, 65);
  let message: string = '';

  const getNextNote = () =>
    validNotes[Math.floor(Math.random() * validNotes.length)];

  let [targetMidi, [targetNote]] = getNextNote();

  const setMessage = (m: string) => {
    message = m;
    clearTimeout(timeout);
    timeout = setTimeout(() => (message = ''), 5000);
  };

  const play = () => {
    playNote(context, targetNote, context.currentTime, { duration: 5 });
  };

  const guess = (midi: number | string, note: NoteWithOctave) => () => {
    const duration = 1;
    playNote(context, note, context.currentTime, { duration });
    playNote(context, targetNote, context.currentTime + duration, {
      duration: duration / 1,
    });

    if (+midi === +targetMidi) {
      setMessage('Correct');
      [targetMidi, [targetNote]] = getNextNote();
    } else {
      setMessage('Try again');
    }
  };
</script>

<div class="space-y-10">
  <p class="text-center">
    Play the sound and try to guess what note you're hearing.
  </p>

  <button
    class="w-full bg-purple-400 border-purple-500 hover:bg-purple-500 hover:border-purple-600 active:bg-purple-600 active:border-purple-700 active:ring-purple-300 focus:ring-purple-200"
    on:click={play}
  >
    Play
  </button>

  <p data-midi={targetMidi} class="text-center h-10 text-4xl">
    {message}
  </p>

  <div class="flex gap-4 flex-wrap">
    {#each validNotes as [midi, note]}
      <button on:click={guess(midi, note[0])}>{note.join(' / ')}</button>
    {/each}
  </div>
</div>
