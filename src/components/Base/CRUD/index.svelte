<script>
  import List, { preload } from "./List.svelte";
  export let data;
  const preloading = preload(data.queryName, data.queryParams);
</script>

{#await preloading}
  <p>Preloading</p>
{:then preloaded}
  <List {data} {...preloaded} />
{:catch error}
  <p>Error preloading : {error}</p>
{/await}
