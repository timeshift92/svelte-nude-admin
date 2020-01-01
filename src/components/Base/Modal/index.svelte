<slot name="button">
  <button
    class="add-button-pyrex {buttonColor} hover:{buttonHover()} text-white
    font-bold py-2 px-3 rounded"
    on:click={() => (showModal = true)}>
    {buttonName}
  </button>
</slot>

{#if showModal}
  <nu-card
    display="flex"
    border="0"
    radius="0"
    padding="0  "
    flow="column"
    theme="main"
    place="fixed cover"
    z="front"
    width="100%"
    height="200%">
    <nu-icon size="lg" name="x-square" place="flex-end" on:click={() => (showModal = false)} />
    <slot handle={handleClose} />
  </nu-card>
{/if}

<script>
  import { createEventDispatcher } from 'svelte'
  // import { fade } from "svelte/transition";
  let showModal = false
  export let buttonColor = 'bg-blue-500'
  export let buttonName = 'Добавить'

  const handleClose = _showModal => {
    showModal = _showModal
  }

  let buttonHover = () => {
    let clr = buttonColor.split('-')
    clr[2] = '700'

    return clr.join('-')
  }
</script>
