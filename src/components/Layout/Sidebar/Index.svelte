{#if $expanded}
  <nu-block
    place="fixed cover"
    on:click={change}
    display="none|block|block"
    fill="rgba(1,1,1,0.5)"
    width="||100%"
    height="100%"
    background="red"
    z="front" />
{/if}
<nu-menu
  class:sidebar={true}
  scrollbar
  id="sidebar"
  style="postion:inherit"
  color
  fill="subtle"
  theme="main"
  height="103vh"
  z="front"
  place="|fixed|fixed"
  overflow="yes :pressed:[scroll-y]|no :pressed[scroll-y]"
  area="span 12"
  border
  bind:clientWidth={width}
  width="{$progress + 70}px|{$progress}px"
  {...$expanded ? { 'nu-pressed': true } : {}}>
  <nu-heading padding="1" text="center w6" level="4">
    <nu-block hide="yes #sidebar:pressed[no]" transition="all 1.5s">
      <a href={brand.url}>{brand.name}</a>
    </nu-block>
    <nu-block hide="no #sidebar:pressed[yes]" transition="all 1.5s">
      <a href={brand.url}>{brand.short_name}</a>
    </nu-block>
  </nu-heading>
  {#each sidebar as list}
    <nu-heading hide="yes #sidebar:pressed[no]" transition="all 1.5s ease-out" padding="1" text=" w1" level="6">
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
  import { change, addRememovePressedAttribute } from '../helper.js'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { applyEffect } from 'RevealEffect'
  let width

  onMount(() => {
    width = document.body.clientWidth
    applyEffect('.sidebar', {
      clickEffect: true,
      // lightColor: 'rgba(255,255,255,0.9)',
      gradientSize: 80,
      isContainer: true,
      children: {
        borderSelector: 'nu-menuitem',
        elementSelector: '.btn',
        // lightColor: 'rgba(255,255,255,0.3)',
        gradientSize: 'auto',
      },
    })
  })
</script>
