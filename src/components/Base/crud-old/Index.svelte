<ServiceProvider {data} let:data>
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
        <Pagination />
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

</script>
