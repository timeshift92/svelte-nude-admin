<nu-flex flow="column" use:events use:attrs={options}>
  <svelte:component
    this={component}
    on:change={handleChange}
    bind:value
    {...objectWithoutKeys($$props, [
      'options',
      'component',
      'output',
      'value',
    ])} />
</nu-flex>

<script>
  export let output,
    name,
    value,
    type,
    component,
    path = null,
    options = {},
    index = 0
  $: if (type == 'hidden' && Object.keys(output).length > 0) {
    if (path) {
      if (Array.isArray(output[path]) && output[path][index]) {
        output[path][index][name] = value
      }
    } else output[name] = value
  }
  let creatable = true
  if (value) {
    creatable = false
  }

  const handleChange = e => {
    if (path) {
      if (index != undefined) {
        if (!output[path]) {
          output[path] = []
        }
        if (!output[path][index]) {
          output[path][index] = creatable ? { _create: true } : {}
        }
        output[path][index][name] =
          type === 'number' ? parseFloat(value) : value
      } else {
        output[path] = [{ [name]: value }]
      }
    } else output[name] = type === 'number' ? parseFloat(value) : value
  }
  import { objectWithoutKeys } from '../utils.js'
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
</script>
