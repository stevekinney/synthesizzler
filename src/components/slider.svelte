<script lang="ts">
  interface $$Props
    extends Omit<Partial<HTMLInputElement>, 'value' | 'min' | 'max' | 'step'> {
    label: string;
    value: number;
    id?: string;
    min?: number;
    max?: number;
    step?: number;
  }

  export let label: string;
  export let value: number;
  export let id = label.toLowerCase().replace(/\s/g, '-');
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let step: number | undefined = undefined;
</script>

<div class="mb-4">
  <div class="flex gap-4 items-center">
    <label for={id}>{label}</label>
    <label for="{id}-input" class="sr-only">Manual Input for {label}</label>
    <input
      id="{id}-input"
      type="number"
      bind:value
      {max}
      {min}
      {step}
      {...$$restProps}
    />
  </div>
  <div class="flex gap-4 items-center">
    {#if min !== undefined}
      <span>{min}</span>
    {/if}
    <input type="range" {id} bind:value {min} {max} {step} {...$$restProps} />
    {#if max !== undefined}
      <span>{max}</span>
    {/if}
  </div>
</div>
