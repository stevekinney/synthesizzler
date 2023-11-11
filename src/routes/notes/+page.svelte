<script lang="ts">
  import { getFrequency } from '$lib/get-frequency-for-note';
  import { midiNumbersToNotes } from '$lib/note-to-midi-number';
  import { playFrequency } from '$lib/play';

  const context = new AudioContext();
</script>

<svelte:head>
  <title>Notes</title>
</svelte:head>

<h2>Reference Guide for Notes</h2>

<table>
  <thead>
    <tr>
      <th>Note</th>
      <th>MIDI Note</th>
      <th>Equal Temperment Frequency</th>
      <th>Play Note</th>
    </tr>
  </thead>
  <tbody>
    {#each midiNumbersToNotes() as [midi, notes]}
      {@const frequency = getFrequency(notes[0])}
      <tr>
        <td>{notes.join(' / ')}</td>
        <td>{midi}</td>
        <td>{frequency}</td>
        <td
          ><button on:click={() => playFrequency(context, frequency)}
            >▶️ Play</button
          ></td
        >
      </tr>
    {/each}
  </tbody>
</table>
