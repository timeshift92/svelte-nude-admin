{#if is_loading}
  <Spinner />
{:else}
  <Form {...objectWithoutKey(formBuilder, 'fields')}>
    {#each formBuilder.fields as prop}
      {#if hasComplexType(prop.type)}
        <svelte:component
          this={Form[prop.type]}
          bind:output
          bind:value={formData}
          {...prop} />
      {:else}
        <Field
          component={getComponent(prop.type)}
          {...prop}
          bind:output
          bind:value={formData[prop.name]} />
      {/if}
    {/each}
    <nu-flex>
      <nu-btn on:click={send}>Добавить</nu-btn>
    </nu-flex>
  </Form>
{/if}

<script>
  import Spinner from '../../../Spinner.svelte'
  import { query, restore, mutate, hasura } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import {
    objectWithoutKey,
    getComponent,
    hasComplexType,
  } from '../../../utils.js'
  import Field, { Form } from '../../../form'

  const {
    queryName,
    formBuilder,
    returning,
    columns,
    rows$,
    cached,
    queryResult$,
  } = getContext('CRUD')
  import {
    updateAdapter,
    mutationFieldsAdapter,
  } from '../../../queryTemplates/query.js'
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
      const query = updateAdapter(queryName, output, formBuilder.fields, id)

      let res = await query.where({ id }).mutate()
      $queryResult$.set(cchd => {
        cchd.data[queryName].flatMap(dt => {
          if (dt.id == res.data[`${dataPrefix}${queryName}`].returning[0].id) {
            dt = Object.assign(
              dt,
              res.data[`${dataPrefix}${queryName}`].returning[0]
            )
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
