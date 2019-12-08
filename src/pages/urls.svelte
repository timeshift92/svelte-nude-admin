<style>
  .container {
    margin: 2em auto;
    width: 600px;
  }
  .files,
  .paths {
    display: inline-block;
  }
  .paths {
    float: right;
  }
  a {
    display: block;
  }
  .pagedir {
    color: #555;
  }
</style>

<script>
  export let routes
  const _routes = routes.map((route, i) => {
    route.url = route.path
      .replace('[collection]', 'posts')
      .replace('[id]', '1')
      .replace(/index$/, '')
    return routes
  })
  const params = {
    foo: 'bar',
    baz: 'booze',
  }
</script>

<div class="content">
  <div>File: src/pages/index.svelte</div>

  <div class="container">
    <div class="files">
      <strong>Files in src/pages</strong>
      {#each routes as route}
        <div class="file">
          <span>.{route.path}.svelte</span>
        </div>
      {/each}
    </div>
    <div class="paths">
      <strong>Generated URLS</strong>
      {#each routes as route}
        <a href={route.url} {params}>{route.url}</a>
      {/each}
    </div>
  </div>

</div>
