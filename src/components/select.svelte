<script lang="ts">
  interface $$Props extends Omit<Partial<HTMLSelectElement>, 'value'> {
    label: string;
    value: string | null | undefined;
    id?: string;
  }

  export let label: string;
  export let value: string | null | undefined;
  export let id = label.toLowerCase().replace(/\s/g, '-');
</script>

<p>
  <label for={id}>{label}</label>
  <select {id} bind:value {...$$restProps}>
    <slot />
  </select>
</p>
