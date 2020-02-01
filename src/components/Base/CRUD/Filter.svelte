{#each columns as column}
  <nu-cell>
    {#if filters.length > 0}
      {#each filters.filter(filter => [filter.name, filter.path].includes(column.name)) as filter}
        <nu-input>
          <input
            type="text"
            name={filter.name}
            bind:value={filter.value}
            on:change={() => handleFilter({ [filter.name]: filter.type == 'text' ? `%${filter.value}%` : filter.value })} />
        </nu-input>
      {/each}
    {:else}
      <nu-input>
        <input type="text" name={column.name} bind:value={column.value} on:change={e => handleFilter({ [column.name]: e.currentTarget.value })} />
      </nu-input>
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
