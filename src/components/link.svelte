<script lang="ts">
  import { page } from '$app/stores';

  interface $$Props extends Partial<HTMLAnchorElement> {
    href: string;
  }

  export let href: string;
</script>

<a
  {href}
  {...$$restProps}
  class:decoration-blue-800={$page.url.pathname === href}
>
  <slot />
</a>
