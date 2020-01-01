<nu-block>
  <nu-label>{label}</nu-label>
  <nu-numinput {...error ? { color: 'red' } : {}} use:events use:attrs={$$props}>
    <input type="number" bind:value />
  </nu-numinput>
  {#if error}
    <nu-block text="i">{error}</nu-block>
  {/if}
</nu-block>

<script>
  export let label, value, error
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
