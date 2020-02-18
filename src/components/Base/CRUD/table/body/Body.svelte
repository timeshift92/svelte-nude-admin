<!-- {#each $rows$ as row} -->
<div class='container'>
<VirtualList items={$rows$} let:item>
  <nu-row display="grid" columns="repeat(7,1fr)" column="span {getColumnLength()}" transform="none" place="center">
    {#each columns as col}
      <nu-cell border="1px" text="center">
        {#if col.component}
          <svelte:component this={col.component} {...col.props ? { ...col.props(item) } : {}} />
        {:else if col.value}
          {@html col.value(item)}
        {:else}{item[col.name] != undefined ? item[col.name] : ''}{/if}
      </nu-cell>
    {/each}
    {#if actions}
      <nu-block>
        <Actions id={item.id} row={item} />
      </nu-block>
    {/if}
  </nu-row>
<!-- {/each} -->
</VirtualList>
</div>
<style>
	.container {
		box-shadow:var(--nu-border-color) 0px -2px 3px 0px;
		min-height: 200px;
		height: calc(100vh - 15em);
	}
</style>
<script>
  import Actions from './actions'
  import { getContext } from 'svelte'
  import VirtualList from '../../VirtualList.svelte'
  let { columns, actions, rows$ } = getContext('CRUD')
	console.log($rows$)
  const getColumnLength = () => {
    let length = columns.length
    if (actions) {
      length++
    }
    return length
  }
</script>
