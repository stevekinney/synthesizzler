<script lang="ts">
  import Link from '$components/link.svelte';
  import '../app.css';
</script>

<div class="container mx-auto my-10 px-4 md:px-2 lg:px-0">
  <header>
    <h1>
      <a href="/" class="no-underline hover:bg-indigo-50 font-bold">
        Making Music with the Web Audio API
      </a>
    </h1>
  </header>
  <nav class="my-10 rounded">
    <ul
      class="flex flex-wrap gap-2 sm:gap-4 items-center lg:before:content-['Examples'] lg:before:mr-2 lg:before:font-bold lg:before:bg-yellow-100 lg:before:px-2"
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
        <Link href="/ear-training">Ear Training</Link>
      </li>
      <li>
        <Link href="/keys">Keys</Link>
      </li>
      <li>
        <Link href="/theremin">Theremin</Link>
      </li>
      <li>
        <Link href="/metronome">Metronome</Link>
      </li>
      <li>
        <Link href="/step-sequencer">Sequencer</Link>
      </li>
    </ul>
  </nav>
  <slot />
</div>
