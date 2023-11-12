<script lang="ts">
  interface $$Props extends Partial<HTMLButtonElement> {
    class?: string | null | undefined;
    condition: boolean;
    on: string;
    off: string;
  }

  export let condition: boolean;

  let className: string | undefined | null = '';
  export { className as class };
</script>

<button
  class={className}
  role="switch"
  aria-checked={condition}
  on:click
  {...$$restProps}
>
  {condition ? $$props.off : $$props.on}
</button>
