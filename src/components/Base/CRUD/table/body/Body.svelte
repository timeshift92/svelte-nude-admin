<nu-rowgroup>
  {#each $rows as row}
    <nu-row transform="none" place="center">
      {#each columns as col}
        <nu-cell border="1x" text="center">
          {#if col.component}
            <svelte:component this={col.component} {...col.props ? {...col.props(row)} : {}} />
          {:else if col.value}
            {@html col.value(row)}
          {:else}{row[col.name] != undefined ? row[col.name] : ''}{/if}
        </nu-cell>
      {/each}
    </nu-row>
  {/each}
</nu-rowgroup>

<script>
  import { getContext } from 'svelte'
	let { columns, actions, rows } = getContext('CRUD')
	console.log($rows)
</script>
