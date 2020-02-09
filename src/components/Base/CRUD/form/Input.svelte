<nu-block hide={type == 'hidden' ? 'yes' : 'no'}>
  {#if type == 'hidden'}
    <nu-input {...error ? { color: 'red' } : {}} >
      <input type="hidden" use:events use:attrs={$$props} {name} bind:value />
    </nu-input>
  {:else}
    <nu-label>{label}</nu-label>
    <nu-input {...error ? { color: 'red' } : {}} >
      <input use:events use:attrs={$$props} bind:value {name} on:change={newData} />
    </nu-input>
  {/if}
  {#if error}
    <nu-block text="i">{error}</nu-block>
  {/if}
</nu-block>

<script>
  export let label, value, error, type, output, name, path, index, id, depend
  function newData() {
    depend = true
    if (path) {
      if (Array.isArray(output[path])) {
        if (!output[path][index]) {
          output[path][index] = {}
        }
        output[path][index][name] = value
      } else {
        output[path] = [{ [name]: value }]
      }
    } else output[name] = value
  }

  // $: if (depend) {
  //   console.log(output)
  //   console.log(name)
  //   newData()
  // }
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
