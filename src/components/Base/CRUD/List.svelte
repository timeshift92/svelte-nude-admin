{#await $queryResult}
  <span>Loading...</span>
{:then result}
  <Table rows={result.data[queryName.toLowerCase()]} withActions={true}>
    <span slot="create" class="flex justify-end px-4 py-2 ">
      <Modal let:handle={handleClose}>
        <Form {handleClose} cache={result} />
      </Modal>
    </span>
    <span slot="actions" class="flex justify-end px-4 py-2 m-2" let:id let:row>

      <Modal
        buttonName="Удалить"
        buttonColor="bg-red-500"
        let:handle={handleClose}>
        <Delete {handleClose} {id} cache={result} />
      </Modal>
      <Modal
        buttonName="Редактировать"
        buttonColor="bg-green-500"
        let:handle={handleClose}>
        <Form formType="update" {handleClose} {row} cache={result} />
      </Modal>

    </span>
    {#if data.limit && result.data[queryName.toLowerCase() + '_aggregate']}
      <!-- content here -->
      <Pagination
        on:change={() => getData()}
        total={result.data[queryName.toLowerCase() + '_aggregate'].aggregate.count}
        bind:limit={data.limit}
        bind:offset />
    {/if}
    <div slot="pagination" class="inline-flex p-4" />

  </Table>
{:catch error}
  Error loading: {error}
{/await}

<script context="module">
  import { mutate as qry } from '~/api.js'

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
  import { restore, query } from '~/api.js'
  import { queries } from '../../../queries'
  import { beforeUpdate, onDestroy } from 'svelte'
  import Table from '../../../components/Base/Table/index.svelte'
  import Pagination from '../../../components/Base/Table/Pagination.svelte'
  import Form from './CreateUpdate.svelte'
  import Delete from './Delete.svelte'
  import Modal from '../../../components/Base/Modal/index.svelte'
  import { setContext } from 'svelte'

  export let data

  setContext('CRUD', data)
  export let cache

  restore(queryName, cache.data)
  let offset = 0
  let limit = data.limit || 15

  const getData = () => {
    queryResult = query(queryName, {
      offset,
      limit,
    })
  }

  let queryResult = query(queryName, {
    offset,
    limit,
  })

  let table
</script>
