<slot>
  <!-- optional fallback -->
</slot>

<script>
  import { getContext, setContext } from 'svelte'
  import { writable, get } from 'svelte/store'
  import { columnsAdapter } from './queryTemplates/query.js'
  export let data;
  data.queryResult$ = writable(writable([]))

  function getData() {
    const dt = get(data.queryResult$)
    if (dt && dt.subscribe) {
      return get(dt)
    }
    return false
  }
  if (data.queryName) {
    data.rows$ = writable([])
    data.total$ = writable(0)
    data.offset$ = writable(0)

    let request = columnsAdapter(data.queryName, data.columns)
    if (data.queryParams) {
      request.where(data.queryParams)
    }

    if (data.pagination) {
      request.paginate(data.pagination.limit, data.$offset$)
    }

    request.upd = async () => {
			const res$ = await request.paginate(data.pagination.limit, get(data.offset$)).await()
			const result = await get(res$)
      data.queryResult$.set(res$)
			data.rows$.set(result.data[data.queryName])
			 window.rw = data.rows$;
      data.total$.set(result.data[data.queryName + '_aggregate'].aggregate.count)
      window.qr = data.queryResult$
    }

    request.upd()
		data.request = request
		setContext('CRUD', data)
  }
  $: if (data.queryName && getData() && getData().data && data.queryResult$) {
    data.rows$.set(getData().data[data.queryName])
    data.cached = getData()
    if (data.cached.data[data.queryName + '_aggregate']) data.total$.set(data.cached.data[data.queryName + '_aggregate'].aggregate.count)
  }

  setContext('CRUD', data)
</script>
