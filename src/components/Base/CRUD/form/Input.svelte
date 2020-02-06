<nu-block hide={type == 'hidden' ? 'yes' : 'no'}>
  {#if type == 'hidden'}
    <nu-input {...error ? { color: 'red' } : {}} use:events use:attrs={$$props}>
      <input type="hidden" use:attrs={$$props} bind:value on:change={newData} />
    </nu-input>
  {:else}
    <nu-label>{label}</nu-label>
    <nu-input {...error ? { color: 'red' } : {}} use:events use:attrs={$$props}>
      <input use:attrs={$$props} bind:value on:change={newData} />
    </nu-input>
  {/if}
  {#if error}
    <nu-block text="i">{error}</nu-block>
  {/if}
</nu-block>

<script>
  export let label, value, error, type, output, name, path
  function newData() {
    if (path) {
      if (Array.isArray(output[path])) {
        output[path][0][name] = value
      } else {
        output[path] = [{ [name]: value }]
      }
    } else output[name] = value
  }
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
