<nu-menu
  {...hide ? { hide: hide } : {}}
  padding="15px 0 0 0 "
  bind:this={child}
  transition="height .5s ease-out;"
  overflow="no"
  height="^#block :{type}[{height}px] {startHeight}; "
  shadow="none"
  gap="2px"
  display="flex"
  border="0">
  {#each items as item}
    <nu-menuitem
				shadow="^ :hover[1px] 1px"
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

<script context="module">
  function invalidate() {
    document.querySelectorAll("nu-menuitem[nu-id='item']").forEach(item => {
      if (item.getAttribute('nu-pressed') != null) {
        item.click()
      }
    })
  }
</script>

<script>
  import { isActive, url } from '@sveltech/routify'
  import { go } from '../helper.js'
  import { onMount, createEventDispatcher } from 'svelte'
  import { expanded } from '../store'

  const dispatch = createEventDispatcher()
  let pressed = false
  onMount(() => {
    height = child.children.length * (child.children.length > 3 ? 44 : 50)
    startHeight = 0
  })

  function active(state) {
    invalidate()
    if (state && menu) {
      setTimeout(() => {
        if (!menu.getAttribute('nu-pressed')) menu.click()
      }, 50)
    }
    return state
  }
  export let startHeight = 'auto'
  export let height = 0
  export let hide = 'no'
  export let menu
	export let type = 'pressed'


  let child
	export let items = []

</script>
