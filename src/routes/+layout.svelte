<script lang="ts">
  import Link from '$components/link.svelte';
  import '../app.css';
</script>

<div class="container mx-auto my-10 px-4 md:px-2 lg:px-0">
  <header>
    <h1>
      <a href="/" class="no-underline hover:bg-indigo-50">
        Making Music with the Web Audio API
      </a>
    </h1>
  </header>
  <nav class="my-10 rounded">
    <ul
      class="flex flex-wrap gap-2 items-center md:before:content-['Examples'] md:before:mr-2 md:before:font-bold md:before:bg-yellow-100 md:before:px-2"
    >
      <li>
        <Link href="/oscillator">Oscillator</Link>
      </li>
      <li>
        <Link href="/analyzer">Analyzer</Link>
      </li>
      <li>
        <Link href="/notes">Notes</Link>
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
        <Link href="/metronome">Metronome</Link>
      </li>
    </ul>
  </nav>
  <slot />
</div>
