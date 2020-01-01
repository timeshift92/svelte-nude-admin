<nu-block overflow="scroll" height="100vh" width="100vh">

  <slot name="create" />
  <nu-table width="100vh" border="1x bottom">
    <Header {columns} />
    <Body {columns} {rows} >
			<nu-el slot="actions" let:id={id} let:row={row}>
				<slot {id} {row} name="actions"></slot>
			</nu-el>
		</Body>
  </nu-table>
  <slot name="pagination" />

</nu-block><script>
  import Body from './Body.svelte'
  import Header from './Header.svelte'
  import { onDestroy } from 'svelte'
  export let rows
  export let withActions
  import { getContext, setContext } from 'svelte'
  let { columns } = getContext('CRUD')
  // let columns = []
  if (!columns && rows && rows.length > 0) {
    columns = Object.keys(rows[0]).splice(0, Object.keys(rows[0]).length - 1)
    columns = columns.map(c => ({ name: c, title: c }))
  }
  if (withActions && columns) {
    columns.push({ name: 'actions', title: 'Действия' })
  }
</script>
