{#if is_loading}
  <Spinner />
{:else}
  <Form {...objectWithoutKey(formBuilder, 'fields')}>
    {#each formBuilder.fields as prop}
      {#if hasComplexType(prop.type)}
        <svelte:component this={Form[prop.type]} bind:output bind:value={formData} {...prop} />
      {:else}
        <Field component={getComponent(prop.type)} {...prop} bind:output bind:value={formData[prop.name]} />
      {/if}
    {/each}
    <nu-flex>
      <nu-btn on:click={send}>Добавить</nu-btn>
    </nu-flex>
  </Form>
{/if}

<script>
  import { Spinner } from 'crud/components'
  import { query, restore, mutate, hasura } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { objectWithoutKey, getComponent, hasComplexType } from 'crud/helpers/formHelper.js'
  import Field, { Form } from 'crud/form'

  const { queryName, formBuilder, returning, columns, rows$, cached, queryResult$ } = getContext('CRUD')
  import { updateAdapter, mutationFieldsAdapter } from 'crud/helpers/queryHelper.js'

  export let row

  let output = {}
  let id = row.id
  let is_loading = true

  const request = mutationFieldsAdapter(hasura(queryName), formBuilder.fields)
    .where({ id: row.id })
    .get(false)
    .then(c => {
      is_loading = false
      formData = row = c.data[queryName][0]
    })
  let formData = {}

  formData = row
  const dataPrefix = 'update_'

  export let handleClose

  async function send(e) {
    e.preventDefault()
    let res = async () => {
      const query = updateAdapter(queryName, output, formBuilder.fields, id)
      let res = await query.where({ id }).mutate()
      $queryResult$.set(cchd => {
        cchd.data[queryName].flatMap(dt => {
          if (dt.id == res.data[`${dataPrefix}${queryName}`].returning[0].id) {
            dt = Object.assign(dt, res.data[`${dataPrefix}${queryName}`].returning[0])
          }
        })
        rows$.set(cchd.data[queryName])
        handleClose(false)
        return cchd
      })
    }
    res()
  }
</script>
