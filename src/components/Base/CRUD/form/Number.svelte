<nu-block>
  <nu-label>{label}</nu-label>
  <nu-input type="number" {...error ? { color: 'red' } : {}} {value} use:events use:attrs={$$props}>
    <input type="number" use:attrs={$$props} bind:value />
  </nu-input>
  {#if error}
    <nu-block text="i">{error}</nu-block>
  {/if}
</nu-block>

<script>
  export let label, value, error, name, output
  $: output[name] = value
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
