<nu-row columns={`repeat(${getColumnLength()},1fr)`} display="grid" column="span {getColumnLength()}" overflow="scroll">
  {#each columns as col, i}
    <nu-columnheader cursor="pointer" role="checkbox" border="1px" text="center">
      <nu-flex gap="0.5" content="center">
        <nu-btn
          shadow="none"
          role="checkbox"
          width="100%"
          on:click={e => col.sort && handleSort(!JSON.parse(e.currentTarget.attributes['aria-checked'].value), col)}
          border="0 :focus:pressed:active:hover[0]">
          <nu-label>{col.title}</nu-label>
          {#if col.sort}
            <nu-icon name="chevron-down" transform="^:pressed[scale(1, -1)]" />
          {/if}
        </nu-btn>
      </nu-flex>
    </nu-columnheader>
  {/each}
  {#if actions}
    <nu-columnheader cursor="pointer" role="checkbox" border="1px" text="center">
      <nu-flex gap="0.5" content="center">
        <nu-btn shadow="none" role="checkbox" width="100%" border="0 :focus:pressed:active:hover[0]">
          <nu-label>{actions.title}</nu-label>
        </nu-btn>
      </nu-flex>
    </nu-columnheader>
  {/if}
</nu-row>
<nu-row columns={`repeat(${getColumnLength()},1fr)`} display="grid" column="span {getColumnLength()}" overflow="scroll">
  <Filter />
</nu-row>
<slot />
<style>
nu-row::-webkit-scrollbar{
	display:none
}
</style>
<script>
  import {Filter} from 'crud/components'
  import { getContext } from 'svelte'
  let { columns, request, actions } = getContext('CRUD')
  const handleSort = (is_desc, col) => {
    request.orderBy(col.sort(is_desc))
    request.upd()
  }

  const getColumnLength = () => {
    let length = columns.length
    if (actions) {
      length++
    }
    return length
  }
</script>
