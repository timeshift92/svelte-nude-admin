{#await $queryResult}
  <Spinner />
{:then result}
  {setColumns(result.data[queryName.toLowerCase()])}
  <Table
    rows={result.data[queryName.toLowerCase()]}
    withActions={data.withActions != undefined ? data.withActions : true}>
    <nu-row slot="filters" let:col={column}>
      <Filter columns={data.columns} filters={data.filters} on:filter={e => getData(e.detail)} />
    </nu-row>
    <nu-el slot="create">
      <Modal let:handle={handleClose}>
        <Form {handleClose} cache={result} />
      </Modal>
    </nu-el>
    <nu-el slot="actions" let:id let:row>

      <Modal buttonName="Удалить" buttonColor="bg-red-500" let:handle={handleClose}>
        <Delete {handleClose} {id} cache={result} />
      </Modal>
      <Modal buttonName="Редактировать" buttonColor="bg-green-500" let:handle={handleClose}>
        <Form formType="update" {handleClose} {row} cache={result} />
      </Modal>
    </nu-el>
    <div slot="pagination" class="inline-block p-4"  >
      {#if data.limit && result.data[queryName.toLowerCase() + '_aggregate']}
        <Pagination
          on:change={() => getData()}
          total={result.data[queryName.toLowerCase() + '_aggregate'].aggregate.count}
          bind:limit={data.limit}
          bind:offset />
      {/if}
    </div>

  </Table>
{:catch error}
  Error loading: {JSON.stringify(error)}
{/await}

<script context="module">
  import { mutate as qry } from 'api.js'

  let queryName
  let queryParams
  export async function preload(_query, _params) {
    queryName = _query
    queryParams = _params
    return {
      cache: await qry(queryName, queryParams),
    }
  }
</script>

<script>
  import Filter from './Filter.svelte'

  import Spinner from 'co/Spinner.svelte'
  import { restore, query } from 'api.js'
  import { queries } from '../../../queries'
  import { beforeUpdate, onDestroy } from 'svelte'
  import Table from '../../../components/Base/Table/index.svelte'
  import Pagination from '../../../components/Base/Table/Pagination.svelte'
  import Form from './CreateUpdate.svelte'
  import Delete from './Delete.svelte'
  import Modal from '../../../components/Base/Modal/index.svelte'
  import { setContext } from 'svelte'

  export let data

  queryName = data.queryName
  queryParams = data.queryParams

  let offset = 0
  let limit = data.limit || 15

  const getData = variables => {
    for (var key in variables) {
      if (variables[key] == '') {
        delete variables[key]
      }
    }
    console.log(variables)

    queryResult = query(queryName, {
      offset,
      limit,
      ...variables,
    })
  }

  let queryResult = query(queryName, {
    offset,
    limit,
  })

  function setColumns(rows) {
    if (!data.columns && rows && rows.length > 0) {
      let columns = Object.keys(rows[0]).splice(0, Object.keys(rows[0]).length - 1)
      columns = columns.map(c => ({ name: c, title: c }))
      data.columns = columns
    }

    if (data.withActions && data.columns && !data.columns.filter(col => col.name == 'actions')[0]) {
      data.columns.push({ name: 'actions', title: 'Действия' })
    }
    return ''
  }
  data.getData = getData
  setContext('CRUD', data)

  let table
</script>
