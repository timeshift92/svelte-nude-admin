<style>
nu-menu#sidebar::-webkit-scrollbar{
	display:none
}
</style>
<nu-block
  id="cover"
  place="fixed cover"
  on:click={change}
  display="none|none :pressed[block]"
  fill="rgba(1,1,1,0.5)"
  width="||100%"
  height="100%"
  background="red"
  z="front" />
<nu-menu
  class:sidebar={true}
  scrollbar
  id="sidebar"
  style="postion:inherit"
  color
	display="flex"
  fill="subtle"
  theme="main"
  height="100vh"
  z="front"
  place="|fixed|fixed"
  overflow="^ :hover[scroll-y]:pressed[scroll-y] yes  |:hover[yes]:pressed[scroll-y] no"
  area="span 12"
  border
  width="{$progress + 85}px|{$progress}px">
  <nu-heading padding="1" text="center" level="4">
    <nu-link color="local" fill="local" hide="^#sidebar :pressed[no] yes " >
      <a style="text-decoration:none" href={brand.url}>{''}</a>
      {brand.name}
    </nu-link>
    <nu-link color="local" fill="local" hide="^#sidebar :pressed[yes] no " >
      <a style="text-decoration:none" href={brand.url}>{''}</a>
      {brand.short_name}
    </nu-link>
  </nu-heading>
  {#each sidebar as list}
    <nu-heading hide="^#sidebar :pressed[no] yes " transition="all 1.5s ease-out" padding="1" text="w1" level="6">
      {list.name}
    </nu-heading>
    <List items={list.items} />
  {/each}
</nu-menu>

<script context="module">
  import { expanded } from '../store.js'

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  })
  expanded.subscribe(c => {
    !c ? progress.set(0) : progress.set(300)
  })
</script>

<script>
  import { onMount } from 'svelte'
  import List from './List.svelte'
  import { brand, sidebar } from './data.js'
  import { change, addRemovePressedAttribute } from '../helper.js'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { applyEffect } from 'RevealEffect'

  onMount(() => {
    applyEffect('nu-menu', {
      clickEffect: true,
      gradientSize: 80,
      isContainer: true,
      children: {
        borderSelector: 'nu-menuitem',
        elementSelector: 'nu-menuitem',
        gradientSize: 'auto',
      },
    })
  })
</script>
