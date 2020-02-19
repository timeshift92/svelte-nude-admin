{#each columns as column}
  {#if column.filter}
    <nu-cell {...column.filter.options}>
      {#if column.filter.component}
        <svelte:component this={column.filter.component} {filterChange} {filterClear} />
      {:else}
        <nu-input>
          <input
            type="text"
            on:change={e => {
              const val = e.currentTarget.value
              if (val) request.where(column.filter.query(e.currentTarget.value))
              else {
                const keys = Object.keys(column.filter.query(e.currentTarget.value))
                delete request._where[keys[0]]
              }
              request.upd()
            }} />
        </nu-input>
      {/if}

    </nu-cell>
  {:else}
    <nu-cell />
  {/if}

{/each}

<script>
  import { getContext } from 'svelte'
  let { columns, request } = getContext('CRUD')
  const filterChange = value => {
    request.where(value)
    request.upd()
  }
  const filterClear = fieldName => {
    delete request._where[fieldName]
  }
</script>
