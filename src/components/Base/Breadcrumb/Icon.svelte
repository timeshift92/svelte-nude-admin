<script>
  export let routes = [
    {
      url: '/',
      name: 'Home',
      icon: 'fas fa-tachometer-alt',
    },
    {
      url: '/library',
      name: 'Library',
      icon: 'far fa-file',
    },
    {
      url: '/library/data',
      name: 'Data',
      icon: 'fas fa-list',
    },
  ]
  let count = routes.length - 1
</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    {#each routes as rt, index}
      {#if index !== count}
        <li class="breadcrumb-item">
          <a href={rt.url}>
            <i class={rt.icon} />
            {rt.name}
          </a>
        </li>
      {:else}
        <li class="breadcrumb-item active">
          <i class={rt.icon} />
          {rt.name}
        </li>
      {/if}
    {/each}
  </ol>
</nav>
