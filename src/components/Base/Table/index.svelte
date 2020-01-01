<nu-flex flow="column" height="100vh" width="100%">
  <slot name="create" />
  <slot name="pagination" />
  <nu-table border="1x bottom" width="100%">
    <Header {columns}>
      <slot name="filters" slot="filters" />
    </Header>
    <Body {columns} {rows}>
      <nu-el slot="actions" let:id let:row>
        <slot {id} {row} name="actions" />
      </nu-el>
    </Body>
  </nu-table>
</nu-flex>

<script>
  
  import Body from './Body.svelte'
  import Header from './Header.svelte'
  import { onDestroy } from 'svelte'
  export let rows
  import { getContext, setContext } from 'svelte'
  let { columns } = getContext('CRUD')
</script>
