{#await $preload}
  Загрузка
{:then dt}
  <div class="inline-block relative w-64">

    {#if multiple}
      <select multiple bind:value>
        {#each dt.data[queryName.toLowerCase()] as item}
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {:else}
      <select
        bind:value
        class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none
        focus:shadow-outline">
        <option selected disabled />
        {#each dt.data[queryName.toLowerCase()] as item}
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {/if}

    <div style="height:5px" class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" />
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
      } else {
        output[name] = value
      }
    }, 300)
  })

  $: if (value) {
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
