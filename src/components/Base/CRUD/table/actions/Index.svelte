<Modal buttonName="Удалить"  let:handle={handleClose}>
  <Delete {handleClose} {id} />
</Modal>

<Modal  buttonName="Редактировать"  let:handle={handleClose}>
  <Update  {handleClose} {row} />
</Modal>

<script>
  import {Modal} from 'crud/components'
  import Delete from './Delete.svelte'
  import Update from './Update.svelte'
  export let id
  export let row
</script>
