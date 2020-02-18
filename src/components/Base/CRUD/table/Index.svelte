<nu-flex flow="column" gap="1">
  <slot name="create" />
  <slot name="pagination" />
  <Header {columns}>
    <slot name="filters" slot="filters" />
  </Header>
  <nu-gridtable
    shadow="#e4e9f3 0px -2px 3px 0px"
    height="90vh"
    overflow="scroll"
    display="grid"
    scrollbar
    border="1x bottom"
    width="100%"
    columns={`repeat(${columns.length + 1},1fr)`}>

    <Body {columns} {rows}>
      <nu-el slot="actions" let:id let:row>
        <slot {id} {row} name="actions" />
      </nu-el>
    </Body>
  </nu-gridtable>
</nu-flex>

<script>
  import { Body } from './body'
  import Header  from './header/Header.svelte'
  import { onDestroy } from 'svelte'
  export let rows
  import { getContext, setContext } from 'svelte'
  let { columns } = getContext('CRUD')
</script>
