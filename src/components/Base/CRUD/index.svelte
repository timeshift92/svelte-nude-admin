<Table>
  <nu-el slot="create" padding="1">
    <Modal let:handle={handleClose}>
      <Form {handleClose} />
    </Modal>
  </nu-el>
  <div slot="pagination" class="inline-block p-4">
    <Pagination bind:offset />
  </div>
</Table>

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
  import Spinner from 'co/Spinner.svelte'
  import Table from './table/Index.svelte'
  import Pagination from './table/Pagination.svelte'
  import Form from './CreateUpdate.svelte'

  import Modal from './modal/index.svelte'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { columnsAdapter } from './queryTemplates/query.js'
  export let data
  let offset = 0

  let request = columnsAdapter(data.queryName, data.columns).paginate(data.limit, offset)
  let queryResult$ = request.await()
  data.request = request
  data.rows$ = writable([])
  data.total$ = writable(0)
  request.upd = async () => {
    const res = await request.paginate(data.limit, offset).get()
    queryResult$.set(res)
  }
  $: if ($queryResult$ && $queryResult$.data) {
    data.rows$.set($queryResult$.data[data.queryName])

    if ($queryResult$.data[data.queryName + '_aggregate']) data.total$.set($queryResult$.data[data.queryName + '_aggregate'].aggregate.count)
  }

  setContext('CRUD', data)

  let table
</script>
