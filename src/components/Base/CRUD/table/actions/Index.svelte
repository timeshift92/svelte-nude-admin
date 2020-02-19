<Modal buttonName="Удалить" buttonColor="bg-red-500" let:handle={handleClose}>
  <Delete {handleClose} {id} />
</Modal>

<Modal  buttonName="Редактировать" buttonColor="bg-green-500" let:handle={handleClose}>
  <Update  {handleClose} {row} />
</Modal>

<script>
  import {Modal} from 'crud/components'
  import Delete from './Delete.svelte'
  import Update from './Update.svelte'
  export let id
  export let row
</script>
