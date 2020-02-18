<nu-block>
  <nu-label>{label}</nu-label>
  <nu-input type="number" {...error ? { color: 'red' } : {}} {value} use:events use:attrs={$$props}>
    <input type="number" use:attrs={$$props} {min} bind:value on:change={newData} />
  </nu-input>
  {#if error}
    <nu-block text="i">{error}</nu-block>
  {/if}
</nu-block>

<script>
  export let label, value, error, name, output, path, min, index, depend
  function newData() {
    depend = true
    if (path) {
      if (Array.isArray(output[path])) {
        if (!output[path][index]) {
          output[path][index] = { _create: true }
        }
        output[path][index][name] = value
      } else {
        output[path] = [{ [name]: value }]
      }
    } else output[name] = value
  }

  $: if (depend) {
    console.log(output)
    console.log(name)
    newData()
  }
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
