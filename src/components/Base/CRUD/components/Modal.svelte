<slot name="button">
  <nu-btn on:click={handleClick}>{buttonName}</nu-btn>
</slot>

{#if showModal}
  <nu-card
  	transition:fade={{duration:120}}
    height="auto|fit-content"
    overflow="scroll"
    scrollbar
    bind:this={modalElement}
    display="flex"
    width="auto"
    border="0"
    radius="0"
    flow="column"
    theme="main"
    place="cover"
    z="front">

    <nu-icon size="lg" name="x-square" place="flex-end" on:click={() => (showModal = false)}></nu-icon>
    <slot handle={handleClose} />
  </nu-card>
{/if}

<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { fade } from 'svelte/transition';
  import { modal$ } from 'crud/stores'
  let modalElement
  export let showModal = false
  export let buttonName = 'Добавить'

  const handleClick = () => {
    showModal = true
    setTimeout(() => {
      document.getElementById('modal-service').innerHTML = ''
      document.getElementById('modal-service').append(modalElement)
    }, 5)
  }
  const handleClose = _showModal => {
    showModal = _showModal
  }
</script>
