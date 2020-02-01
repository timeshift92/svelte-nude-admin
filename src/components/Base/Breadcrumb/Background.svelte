<script>
  export let background = 'bg-success'
  export let color = 'text-white-all'
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
  <ol class="breadcrumb {background} {color}">
    {#each routes as rt, index}
      {#if index !== count}
        <li class="breadcrumb-item {background} {color}">
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
