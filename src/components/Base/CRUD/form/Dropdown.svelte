{#await $preload}
  Загрузка
{:then dt}
  <div>
    {#if multiple}
      <select multiple bind:value on:change={newData}>
        {#each dt.data[queryName.toLowerCase()] as item}
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {:else}
      <select on:change={newData} bind:value>
        <option selected disabled />
        {#each dt.data[queryName.toLowerCase()] as item}
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {/if}

  </div>
{:catch error}
  {error}
{/await}

<script>
  import { onMount } from 'svelte'
  export let data,
    value = []

  export let multiple = false
  export let name

  export let depend
  export let id
  export let output = {}

  onMount(() => {
    setTimeout(() => {
      if (multiple && data.foreign_key) {
        value = value.flatMap(vl => vl[data.foreign_key])
      } else if (data.foreign_key) {
        value = value[0][data.foreign_key]
      } else if(Array.isArray(value)) {
        value = value[0]
      }
    }, 300)
  })

  function newData() {
    if (multiple && data.foreign_key) {
      output[name] = value.map(vl => ({ [data.foreign_key]: vl }))
    } else if (data.foreign_key) {
      output[name] = [{ [data.foreign_key]: value }]
    } else {
      output[name] = value
    }
  }
  $: preload = data.preload(depend)

  const queryName = data.name

  function getLabel(item) {
    if (data.fieldName) {
      if (data.fieldName.indexOf('.') != -1) {
        let lbl = data.fieldName.split('.')
        return item[lbl[0]][0][lbl[1]]
      }
      return item[lbl]
    } else {
      return item.name
    }
  }
</script>
