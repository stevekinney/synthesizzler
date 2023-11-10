<script lang="ts">
  import Link from '$components/link.svelte';
  import '../app.css';
</script>

<div class="container mx-auto my-10 px-4 md:px-2 lg:px-0">
  <nav class="mb-10 bg-blue-50 py-2 px-4 border-2 border-blue-200 rounded">
    <ul class="flex space-x-4">
      <li>
        <Link href="/oscillator">Oscillator</Link>
      </li>
      <li>
        <Link href="/keys">Keys</Link>
      </li>
    </ul>
  </nav>
  <slot />
</div>
