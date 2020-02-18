{#if label}
  <nu-label>{label}</nu-label>
{/if}

<nu-input {type} use:events use:attrs={$$props}>
  <input {...type?  {type:type}: {}} bind:value use:events use:attrs={$$props} />
</nu-input>

<script>
  export let value, label, type
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
  
</script>
