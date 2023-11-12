<script lang="ts">
  import Link from '$components/link.svelte';
  import '../app.css';
</script>

<div class="container mx-auto my-10 px-4 md:px-2 lg:px-0">
  <nav class="my-10 rounded">
    <ul class="flex flex-wrap gap-2 items-center">
      <li>
        <Link href="/oscillator">Oscillator</Link>
      </li>
      <li>
        <Link href="/keys">Keys</Link>
      </li>
      <li>
        <Link href="/theremin">Theremin</Link>
      </li>
      <li>
        <Link href="/step-sequencer">Sequencer</Link>
      </li>
      <li>
        <Link href="/notes">Notes</Link>
      </li>
      <li>
        <Link href="/metronome">Metronome</Link>
      </li>
    </ul>
  </nav>
  <slot />
</div>
