<nu-menu
  padding="15px 0 0 0 "
  bind:this={child}
  transition="height .5s ease-out;"
  overflow="no"
  height="{startHeight}; #block:pressed[{height}px] {!$expanded ? `#block:hover[${height}px]` : ''}"
  shadow="none"
  border="0">
  {#each items as item}
    <nu-menuitem
      on:click={() => go(item.url)}
      content="center"
      text="center w1">
      <!-- <nu-link to="{item.url}">{item.name}</nu-link> -->
      {item.name}
    </nu-menuitem>
  {/each}
</nu-menu>

<script>
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
