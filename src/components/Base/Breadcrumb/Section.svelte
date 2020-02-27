{#if routes.length > 1}
  <nu-block text="i">
    {#each routes as route, index}
      {#if index != count}
        <nu-link to={getRoute(index)} theme="violet" fill color>
          <nu-special>{capitalize(route)}</nu-special>
        </nu-link>
      {:else}
        <nu-el padding="0 0 0 5.5px">/</nu-el>
        <nu-el>{capitalize(route)}</nu-el>
      {/if}
    {/each}
  </nu-block>
{/if}

<script src="./script.js">

</script>
