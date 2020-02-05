<nu-grid columns="repeat(3,1fr)" width="100%" gap="2">
  {#each componentProps as prop}
    {#if prop.component}
      <svelte:component this={prop.component} bind:output on:change={e => (formData = Object.assign(formData, e.detail))} {...prop} />
    {:else if prop.type == 'relation'}
      {#each prop.fields as field}
        <svelte:component this={Field[field.type]} bind:output bind:value={formData[prop.name][0][field.name]} {...field} />
      {/each}
    {:else}
      <svelte:component this={Field[prop.type]} bind:output bind:value={formData[prop.name]} {...prop} />
    {/if}
  {/each}

  <nu-flex>
    <nu-btn on:click={send}>Добавить</nu-btn>
  </nu-flex>
</nu-grid>

<script>
  import { query, restore, mutate, hasura } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  const { queryName, componentProps, returning, columns, rows$, cached, queryResult$ } = getContext('CRUD')
  import { mutationAdapter, mutationFieldsAdapter } from '../../../queryTemplates/query.js'

  export let row
  let output = {}
  let id = row.id
  import Field from '../../../form'
  mutationFieldsAdapter(hasura(queryName), componentProps)
    .where({ id: row.id })
    .get()
    .then(c => {
      formData = row = c.data[queryName][0]
    })
  let formData = {}

  formData = row
  const dataPrefix = 'update_'
  const queryPrefix = '_UPDATE'

  export let handleClose

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
      const query = mutationAdapter(queryName, output, componentProps, 'update')
      let res = await query.where({ id }).mutate()
      debugger
      queryResult$.set(cached.data[queryName].push(res.data[`${dataPrefix}${queryName}`].returning[0]))
    }
    await res()
    handleClose(false)
  }
</script>
