<script lang="ts">
  import { playNote } from '$lib/play';
  import { onDestroy } from 'svelte';
  import createWebSerial from './serial';

  const context = new AudioContext();

  let notes: ('C3' | 'E3' | 'G3')[] = [];
  let port: SerialPort | null = null;

  const connect = async () => {
    const webSerial = await createWebSerial();
    if (!webSerial) return;

    webSerial.read((data: string) => {
      const button = parseInt(data, 10);

      switch (button) {
        case 1:
          playNote(context, 'C3');
          notes = [...notes, 'C3'];
          break;
        case 2:
          playNote(context, 'E3');
          notes = [...notes, 'E3'];
          break;
        case 3:
          playNote(context, 'G3');
          notes = [...notes, 'G3'];
          break;
        default:
          console.error(`Unknown button: ${button}`);
      }
    });
  };

  onDestroy(() => {
    port?.close();
  });
</script>

<svelte:head>
  <title>Web Serial API + Web Audio API</title>
</svelte:head>

<div class="space-y-6">
  <p
    class="bg-indigo-50 border-indigo-100 border-2 p-4 rounded col-span-2 gap-8"
  >
    <strong>Note:</strong>
    You'll want to have
    <a
      href="https://github.com/stevekinney/synthesizzler/blob/main/src/lib/web-serial/web-serial.ino"
      target="_blank">this Arduino sketch</a
    >
    loaded on an Arduino board. Also, all of the hard parts of the Web Serial API
    have been abstracted away
    <a
      href="https://github.com/stevekinney/synthesizzler/blob/main/src/routes/serial/serial.ts"
      target="_blank">here</a
    >.
  </p>

  <div class="flex flex-col lg:gap-20 gap-6 md:flex-row">
    <img
      src="https://raw.githubusercontent.com/stevekinney/nodebots-v2/main/public/diagrams/single-led-three-buttons.svg"
      alt="An Arduino Sketch with a single LED and three buttons"
      class="block flex-shrink-0"
    />

    <div class="space-y-6 flex-grow-0">
      <p>Hit the connect button to connect to your Arduino.</p>

      <button on:click={connect}>Connect</button>

      <div class="flex flex-wrap gap-2">
        {#each notes as note}
          <div class="bg-yellow-50 border-yellow-100 border-2 rounded-md p-2">
            {note}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
