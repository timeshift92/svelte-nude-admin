<svelte:component this={component} {data} >
<slot>

</slot>
</svelte:component>

<script>
  import { DataProvider, GraphqlProvider } from 'crud/providers'
  export let data
  let component = DataProvider
  if (data.queryName) {
    component = GraphqlProvider
  }
</script>
