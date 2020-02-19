<ProviderService {data} let:data>
  <Table>
    <nu-el slot="create">
      {#if data.create}
        <Modal let:handle={handleClose}>
          <Create {handleClose} />
        </Modal>
      {/if}
    </nu-el>
    <div slot="pagination" class="inline-block p-4">
      {#if data.pagination}
        <Pagination />
      {/if}
    </div>
  </Table>
</ProviderService>

<script>
  import { ProviderService } from './services'

  import Table from './table/Index.svelte'
  import { Pagination, Modal } from './components'
  import { Create } from './table/actions'

  export let data
</script>
