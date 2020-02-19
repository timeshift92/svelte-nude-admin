<Form action="#" on:submit={send} {...objectWithoutKey(formBuilder, 'fields')}>
  {#each formBuilder.fields as prop}
    {#if hasComplexType(prop.type)}
      <svelte:component this={Form[prop.type]} bind:output bind:value={formData} {...prop} />
    {:else}
      <Field component={getComponent(prop.type)} {...prop} bind:output bind:value={formData[prop.name]} />
    {/if}
  {/each}
  <nu-flex>
    <nu-btn
      on:click={e => {
        document.getElementById('form-submit').click()
      }}>
      Добавить
      <input type="submit" id="form-submit" hidden />
    </nu-btn>
  </nu-flex>
</Form>

<script>
  import Field, { Form } from 'crud/form'
  import { objectWithoutKey, hasComplexType, getComponent } from 'crud/helpers/formHelper.js'
  import { query, restore, mutate } from 'api.js'
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  const dataPrefix = 'insert_'
  const { queryName, formBuilder, returning, columns, rows$, cached, queryResult$ } = getContext('CRUD')
  import { insertAdapter } from 'crud/helpers/queryHelper.js'

  let output
  let formData = {}

  output = formData

  export let handleClose

  async function send(e) {
    e.preventDefault()
    let res = async () => {
      const query = insertAdapter(queryName, output, columns /*formBuilder.fields*/)
      let res = await query.mutate()
      $queryResult$.set(cchd => {
        cchd.data[queryName] = [...cchd.data[queryName], res.data[`${dataPrefix}${queryName}`].returning[0]]
        rows$.set(cchd.data[queryName])
        handleClose(false)
        return cchd
      })
    }
    await res()
  }
</script>
