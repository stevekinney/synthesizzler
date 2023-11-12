<script lang="ts">
  import { repeat } from '$lib/repeat';

  const measures = 4;
</script>

<div class="flex gap-4 w-full justify-evenly">
  {#each repeat(measures) as i}
    <div>
      <h3>Measure {i}</h3>
      <div class="grid grid-cols-4">
        {#each repeat(4) as j}
          <div class="flex flex-col items-center">
            <button class="w-10 h-10 rounded-full bg-blue-200">{j}</button>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
