<form  use:events
    use:attrs={$$props}>
  <nu-grid
    columns="repeat(3,1fr)"
    width="100%"
    gap="2"
    use:events
    use:attrs={$$props}>

    <slot>
      <!-- optional fallback -->
    </slot>

  </nu-grid>
</form>

<script>
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
