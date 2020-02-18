<nu-flex use:events use:attrs={$$props} flow={type}>
  <slot />
</nu-flex>

<script>
  import { getEventsAction, getAttributesAction } from 'utils.js'
	import { current_component } from 'svelte/internal'
	const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
  export let type = 'row'
</script>
