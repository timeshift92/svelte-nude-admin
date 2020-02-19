<slot name="button">
  <nu-btn on:click={handleClick}>{buttonName}</nu-btn>
</slot>

{#if showModal}
  <nu-card height="fit-content" scrollbar bind:this={modalElement} display="flex" border="0" radius="0" flow="column" theme="main" place="cover" z="front">
    <nu-icon size="lg" name="x-square" place="flex-end" on:click={() => (showModal = false)} />

    <slot handle={handleClose} />
  </nu-card>
{/if}

<script>
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { modal$ } from 'crud/stores'
  let modalElement
  export let showModal = false

  export let buttonName = 'Добавить'

  onMount(async () => {
    await tick()
  })
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

  let buttonHover = () => {
    let clr = buttonColor.split('-')
    clr[2] = '700'

    return clr.join('-')
  }
</script>
