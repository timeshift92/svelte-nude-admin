<nu-flex use:events use:attrs={$$props}>
  <nu-tablist value={labels[0]} padding="0 0 0 1" text="center w5">
    {#each labels as item, tab_index}
      <nu-tab controls={labels[tab_index]}>{labels[tab_index]}</nu-tab>
    {/each}
  </nu-tablist>

  {#each labels as item, tab_index}
    <nu-block id={labels[tab_index]}>
      <Form.FieldSet
        {component}
        path={name}
        index={tab_index}
        bind:output
        {value}
        {options}
        fields={fields.flatMap(field => {
          if (tab_index > 0) {
            delete field.required
          }
          return field
        })} />
      {#if args.length > 0 && args.length == labels.length}
        <Field
          component={Field['hidden']}
          type="hidden"
          index={tab_index}
          path={name}
          bind:output
          value={args[tab_index].value}
          name={args[tab_index].name} />
      {/if}

    </nu-block>
  {/each}
</nu-flex>

<script>
  import Field, { Form } from './index.js'
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
  export let labels = [],
    component,
    args = [],
    fields,
    options,
    name,
    output,
    value = []
</script>
