<Errors />

<script>
  import { onDestroy } from 'svelte'
  import { header$ } from 'stores'
  $header$.disable = true
  import Errors from 'co/base/Errors'
  onDestroy(() => {
    $header$.disable = false
  })
</script>
