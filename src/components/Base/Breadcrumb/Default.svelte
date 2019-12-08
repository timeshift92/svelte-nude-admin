<script src="./script.js">

</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    {#each routes as rt, index}
      {#if index != count}
        <li class="breadcrumb-item">
          <a href={getRoute(index)}>{capitalize(rt)}</a>
        </li>
      {:else}
        <li class="breadcrumb-item active" aria-current="page">{capitalize(rt)}</li>
      {/if}
    {/each}
  </ol>
</nav>
