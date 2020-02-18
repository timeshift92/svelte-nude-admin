{#each $rows$ as row}
  <nu-row
    display="grid"
    columns="repeat(7,1fr)"
    column="span {getColumnLength()}"
    transform="none"
    place="center">
    {#each columns as col}
      <nu-cell border="1x" text="center">
        {#if col.component}
          <svelte:component
            this={col.component}
            {...col.props ? { ...col.props(row) } : {}} />
        {:else if col.value}
          {@html col.value(row)}
        {:else}{row[col.name] != undefined ? row[col.name] : ''}{/if}
      </nu-cell>
    {/each}
    {#if actions}
      <nu-block>
        <Actions id={row.id} {row} />
      </nu-block>
    {/if}
  </nu-row>
{/each}

<script>
  import Actions from './actions'
  import { getContext } from 'svelte'
  let { columns, actions, rows$ } = getContext('CRUD')
  const getColumnLength = () => {
    let length = columns.length
    if (actions) {
      length++
    }
    return length
  }
</script>
