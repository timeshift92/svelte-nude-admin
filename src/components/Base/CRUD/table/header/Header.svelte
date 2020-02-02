<nu-rowgroup>
  <nu-row>
    <Filter />
  </nu-row>
  <nu-row>
    {#each columns as col, i}
      <nu-columnheader cursor="pointer" role="checkbox" border="1x" text="center">
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
  </nu-row>
  <slot />
</nu-rowgroup>

<script>
  import Filter from './Filter.svelte'
  import { getContext } from 'svelte'
  let { columns, request } = getContext('CRUD')
  const handleSort = (is_desc, col) => {
    request.orderBy(col.sort(is_desc))
    request.upd()
  }
</script>
