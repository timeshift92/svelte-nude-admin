{#if is_loading}
  <Spinner />
{:else}
  <nu-grid columns="repeat(3,1fr)" width="100%" gap="2">
    {#each componentProps as prop}
      {#if prop.component}
        <svelte:component this={prop.component} bind:output on:change={e => (formData = Object.assign(formData, e.detail))} {...objectWithoutKey(prop, 'options')} />
      {:else if prop.type == 'relation'}
        {#if prop.tabs}
          <Tabs bind:depend={depend[prop.name]} bind:output value={formData[prop.name]} {...prop.tabs} fields={prop.fields} name={prop.name} path={prop.path} />
        {:else}
          <Field>
            {#each prop.fields as field, index}
              <svelte:component
                this={Field[field.type]}
                bind:depend={depend[prop.name]}
                path={prop.name}
                index={relation_counter}
                bind:output
                value={formData[prop.name][relation_counter][field.name]}
                {...objectWithoutKey(field, 'options')} />
            {/each}
          </Field>
        {/if}
      {:else if prop.type == 'field'}
        {#if prop.tabs}
          <Tabs bind:output value={formData[prop.name]} {...prop.tabs} fields={prop.fields} name={prop.name} path={prop.path} />
        {:else}
          <Field {...prop['options'] || {}}>
            {#each prop.fields as field, index}
              <svelte:component
                this={Field[field.type]}
                bind:output
                value={formData[field.name]}
                {...objectWithoutKey(field, 'options')} />
            {/each}
          </Field>
        {/if}
      {:else}
        <Field component={Field[prop.type]}>
          <svelte:component this={Field[prop.type]} bind:output bind:value={formData[prop.name]} {...objectWithoutKey(prop, 'options')} />
        </Field>
      {/if}
    {/each}
    <nu-flex>
      <nu-btn on:click={send}>Добавить</nu-btn>
    </nu-flex>
  </nu-grid>
{/if}

<script>
  import Spinner from '../../../Spinner.svelte'
  import { query, restore, mutate, hasura } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { objectWithoutKey } from '../../../utils.js'

  import Field from '../../../form'
  import Tabs from './Tabs.svelte'
  const { queryName, componentProps, returning, columns, rows$, cached, queryResult$ } = getContext('CRUD')
  import { updateAdapter, mutationFieldsAdapter } from '../../../queryTemplates/query.js'
  let relation_counter = 0
  const incrementReletionCounter = () => {
    relation_counter++
    return ''
  }
  let depend = {}

  export let row
  let output = {}
  let id = row.id
  let is_loading = true

  mutationFieldsAdapter(hasura(queryName), componentProps)
    .where({ id: row.id })
    .get(false)
    .then(c => {
      is_loading = false
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
    // e.preventDefault()

    let res = async () => {
      check_ref_key()
      debugger

      const query = updateAdapter(queryName, output, componentProps, id)

      let res = await query.where({ id }).mutate()
      $queryResult$.set(cchd => {
        cchd.data[queryName].flatMap(dt => {
          if (dt.id == res.data[`${dataPrefix}${queryName}`].returning[0].id) {
            dt = Object.assign(dt, res.data[`${dataPrefix}${queryName}`].returning[0])
          }
        })
        debugger
        rows$.set(cchd.data[queryName])
        handleClose(false)
        return cchd
      })
    }
    res()
  }
</script>
