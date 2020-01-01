<nu-menu
  padding="15px 0 0 0 "
  bind:this={child}
  transition="height .5s ease-out;"
  overflow="no"
  height="{startHeight}; #block:pressed[{height}px] {!$expanded ? `#block:hover[${height}px]` : ''}"
  shadow="none"
  gap="2px"
  display="flex"
  border="0">
  {#each items as item}
    <nu-menuitem
      {...active($isActive(item.url)) ? { 'nu-pressed': true } : {}}
      border="0"
      role="link"
      content="center"
      place="center">
      <a href={item.url} tabindex="-1">{''}</a>
      {item.name}
    </nu-menuitem>
  {/each}
</nu-menu>

<script>
  import { isActive, url } from '@sveltech/routify'

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  function active(state) {
    dispatch('active', state)
    return state
  }

  import { go } from '../helper.js'
  import { onMount } from 'svelte'
  import { expanded } from '../store'
  onMount(() => {
    height = child.scrollHeight
    startHeight = 0
  })
  export let startHeight = 'auto'
  export let height = 0

  let child
  export let items = []
</script>
