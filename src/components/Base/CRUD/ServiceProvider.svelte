<slot>
  <!-- optional fallback -->
</slot>

<script>
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { columnsAdapter } from './queryTemplates/query.js'
  let data = getContext('CRUD')

  let queryResult$ = writable([])
  if (data.queryName) {
    data.rows$ = writable([])
    data.total$ = writable(0)
    data.queryResult$ = writable(0)
    let request = columnsAdapter(data.queryName, data.columns)
    if (data.queryParams) {
      request.where(data.queryParams)
    }

    if (data.pagination) {
      request.paginate(data.pagination.limit, data.$offset$)
    }
		queryResult$ = request.await()
		window.qr = queryResult$;
    data.queryResult$ = request.await()
    data.request = request

    request.upd = async () => {
      const res$ = await request.paginate(data.pagination.limit, data.$offset$).await()
      queryResult$ = res$
    }
  }

  $: if (data.queryName && $queryResult$ && $queryResult$.data) {
    data.rows$.set($queryResult$.data[data.queryName])
    data.cached = $queryResult$
    if ($queryResult$.data[data.queryName + '_aggregate']) data.total$.set($queryResult$.data[data.queryName + '_aggregate'].aggregate.count)
  }

  setContext('CRUD', data)
</script>
