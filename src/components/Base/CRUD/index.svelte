<ServiceProvider>
  <Table>
    <nu-el slot="create" padding="1">
      {#if data.create}
        <Modal let:handle={handleClose}>
          <Form {handleClose} />
        </Modal>
      {/if}

    </nu-el>
    <div slot="pagination" class="inline-block p-4">
      {#if data.pagination}
        <Pagination limit={data.pagination.limit} bind:offset={data.$offset$} />
      {/if}
    </div>
  </Table>
</ServiceProvider>

<script context="module">
  import { mutate as qry } from 'api.js'
  import ServiceProvider from './ServiceProvider.svelte'
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
  // import Spinner from 'co/Spinner.svelte'
  import Table from './table/Index.svelte'
  import Pagination from './table/Pagination.svelte'
  import Form from './CreateUpdate.svelte'

  import Modal from './modal/index.svelte'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export let data

  data.offset$ = writable(0)
  let limit = data.pagination ? data.pagination.limit : 15

  setContext('CRUD', data)

  let table
</script>
