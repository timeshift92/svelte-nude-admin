<nu-grid columns="repeat(3,1fr)" width="100%" gap="2">
  {#each componentProps as prop}
    {#if prop.component}
      <svelte:component this={prop.component} on:change={e => (formData = Object.assign(formData, e.detail))} {...prop} />
    {:else if prop.type == 'relation'}
      {#each prop.fields as field}
        <svelte:component this={Field[field.type]} bind:value={formData[prop.name][0][field.name]} {...field} />
      {/each}
    {:else}
      <svelte:component this={Field[prop.type]} bind:value={formData[prop.name]} {...prop} />
    {/if}
  {/each}

  <nu-flex>
    <nu-btn on:click={send}>Добавить</nu-btn>
  </nu-flex>
</nu-grid>

<script>
  import { query, restore, mutate } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  const { queryName, componentProps, returning, columns, rows$, cached, queryResult$ } = getContext('CRUD')
  import { mutationAdapter } from './queryTemplates/query.js'

  import Field from './form'

  export let formType = 'create'
  export let row

  let formData = {}
  let dataPrefix = 'insert_'
  let queryPrefix = '_INSERT'
  if (formType === 'update') {
    formData['id'] = row.id
    dataPrefix = 'update_'
    queryPrefix = '_UPDATE'
  }

  function isNativeType(type) {
    return ['password', 'email', 'text', 'number', 'hidden'].includes(type)
  }

  function getKey(data, key) {
    if (!data) return ''
    if (Array.isArray(data)) {
      return getKey(data[0], key)
    } else if (data.name != undefined) {
      return data.name
    } else if (typeof data === 'object') {
      return getKey(data[Object.keys(data)[0]], key)
    } else {
      return data.name || ''
    }
  }
  componentProps.map(item => {
    if (formType === 'update') {
      if (item.path) {
        formData[item.name] = row[item.path][0] ? row[item.path][0][item.name] : ''
      } else if (item.type === 'file') {
        formData[item.name] = []
      } else {
        formData[item.name] = row[item.name]
      }
    } else if (item.value) {
      formData[item.name] = item.value
    } else if (item.type == 'relation') {
      formData[item.name] = [{}]
    } else {
      formData[item.name] = ''
    }
  })

  export let handleClose
  export let cache

  $: getDepend = itemName => {
    return formData[itemName]
  }

  function check_ref_key() {
    for (var key in formData) {
      if (!formData[key] || formData[key] < 0) {
        delete formData[key]
      }
    }
  }

  async function send(e) {
    e.preventDefault()
    let res = async () => {
      check_ref_key()
      const query = mutationAdapter(queryName, formData, componentProps)
      let res = await query.mutate()
      queryResult$.set(cached.data[queryName].push(res.data[`${dataPrefix}${queryName}`].returning[0]))
    }
    await res()
    handleClose(false)
  }
</script>
