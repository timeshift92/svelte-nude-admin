{#if !hide}
  <nu-card use:handleMargin transition:fade={{ duration: 120 }} use:events use:attrs={$$props} place="fixed {postion}" z="front">
    <slot>
      <!-- optional fallback -->
    </slot>
  </nu-card>
{/if}

<script>
  export let postion = 'top'
  export let duration = 0
  export let hide = false

  import { fade } from 'svelte/transition'
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)

  function handleMargin(node) {
    setTimeout(() => {
      if (postion.indexOf('top') !== -1) {
        node.style.margin = '5px 0px 0px 0px'
      } else if (postion.indexOf('left') !== -1) {
        node.style.margin = '0px 5px 0px 0px'
      } else if (postion.indexOf('right') !== -1) {
        node.style.margin = '0px 0px 0px 5px'
      } else {
        node.style.margin = '0px 0px 5px 0px'
      }
    }, 120)
  }
  if (duration != 0) {
    hide = false
    setTimeout(() => {
      hide = true
    }, duration * 1000)
  }
</script>
