{#each columns as column}
  <nu-cell>
    {#if filters.length > 0}
      {#each filters.filter(filter => [filter.name, filter.path].includes(column.name)) as filter}
        <label for={filter.name}>{filter.placeholder}</label>
        <input
          type="text"
          name={filter.name}
          bind:value={filter.value}
          on:change={() => handleFilter({
              [filter.name]: filter.type == 'text' ? `%${filter.value}%` : filter.value,
            })} />
      {/each}
    {:else}
      <label for={column.name}>{column.title}</label>
      <input
        type="text"
        name={column.name}
        bind:value={column.value}
        on:change={e => handleFilter({ [column.name]: e.currentTarget.value })} />
    {/if}

  </nu-cell>
{/each}

<script>
  export let columns = []
  export let filters = []
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function handleFilter(args) {
    dispatch('filter', args)
  }
</script>
