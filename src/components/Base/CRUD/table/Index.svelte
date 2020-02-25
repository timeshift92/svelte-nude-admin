<nu-flex flow="column" gap="1">
  <slot name="create" />
  <slot name="pagination" />
  <Header {columns}>
    <slot name="filters" slot="filters" />
  </Header>
  <slot><!-- optional fallback --></slot>
  {#if $rows$.length > 0}
    <Body />
  {/if}

</nu-flex>

<script>
  import { Body } from './body'
  import Header from './header/Header.svelte'
  import { getContext, setContext } from 'svelte'
  let { columns, rows$ } = getContext('CRUD')
</script>
