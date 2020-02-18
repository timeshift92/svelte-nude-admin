<slot name="button">
  <nu-btn
    on:click={() => (showModal = true)}>
    {buttonName}
  </nu-btn>
</slot>

{#if showModal}
  <nu-card
    display="flex"
    border="0"
    radius="0"
    flow="column"
    theme="main"
    place="cover"
    z="front"
    >
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
