<nu-flex use:events use:attrs={options || {}}>
  {#each fields as field}
    <Field
      bind:output
      {index}
      {type}
      {...objectWithoutKey(field, 'value')}
      {path}
      value={getValue(field)}
      component={getComponent(field.type)} />
  {/each}
</nu-flex>

<script>
  export let value,
    output,
    index,
    path,
    type,
    fields = [],
    options
  import Field from './index.js'
  import { objectWithoutKey, getComponent } from '../utils.js'
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)

  const getValue = field => {
    if (value[path] && path && index != null) {
      return value[path][index] ? value[path][index][field.name] : null
    } else if (path && value[path]) {
      return value[path] ? value[path][field.name] : null
    } else {
      return value[field.name]
    }
  }
</script>
