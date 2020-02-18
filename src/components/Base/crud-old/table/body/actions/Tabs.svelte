<nu-grid>
  <nu-tablist value={labels[0]} padding="0 0 0 1" text="center w5">
    {#each new Array(count) as item, tab_index}
      <nu-tab controls={labels[tab_index]}>{labels[tab_index]}</nu-tab>
    {/each}
  </nu-tablist>

  {#each new Array(2) as item, tab_index}
    <nu-block id={labels[tab_index]}>
      {#each fields as field, index}
        <svelte:component
          this={Field[field.type]}
          on:change={e => handleChange(e.currentTarget.value, e.currentTarget.name, tab_index)}
          bind:depend
          path={name}
          index={tab_index}
          bind:output
          bind:value={value[tab_index][field.name]}
          {...field} />
      {/each}
      {#if args.length == labels.length}
        <svelte:component this={Field['input']} bind:depend type="hidden" path={name} index={tab_index} bind:output value={args[tab_index].value} name={args[tab_index].name} />
      {/if}
      {args[tab_index].value}
    </nu-block>
  {/each}
</nu-grid>

<script>
  import Field from '../../../form'
  let is_create = false
  export let count = 1,
    labels = [],
    args = [],
    fields,
    name,
    output,
    value = [],
    depend

  const handleChange = (value, field_name, _index) => {
    if (!output[name]) {
      output[name] = []
      if (!output[name][_index]) {
        output[name][_index] = {}
        output[name][_index][field_name] = value
      } else {
        output[name][_index][field_name] = value
      }
    }
  }
  $: console.log(value)
  $: console.log(output)

  $: if (output) {
    for (let j = 0; j <= value.length; j++) {
      if (value[j] && value[j]._create && output[name] && output[name][j]) {
        output[name][j]._create = true
        output[name][j][args[j].name] = args[j].value
        is_create = false
      } else if (value[j] && output[name] && output[name][j]) {
        output[name][j][args[j].name] = args[j].value
      }
    }
  }

  if (value.length < labels.length) {
    for (let i = 0; i < labels.length; i++) {
      if (!value[i]) {
        value[i] = {}
        value[i] = { _create: true }
      }
    }
    is_create = true
  }
</script>
