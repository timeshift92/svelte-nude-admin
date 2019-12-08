{#if $expanded}
  <nu-block
    place="||fixed"
    on:click={change}
    display="none|block|block"
    fill="rgba(1,1,1,0.5)"
    width="||100%"
    height="100%"
    background="red"
    z="front" />
{/if}

<nu-menu
  color
  fill
  theme="main"
  height="100%"
  z="front"
  place="||fixed"
  overflow={$expanded ? 'scroll-x' : 'yes|yes|no'}
  area="span 12"
  border
	display='||none #sidebar:pressed[none]'
	bind:clientWidth={width}
  width="{ $progress + 70}px||{$progress}px"
  {...$expanded ? { 'nu-pressed': true } : {}}>
  <nu-heading padding="1" text="center w6" level="4">
    <nu-el hide={$expanded ? 'no' : 'yes'}>{brand.name}</nu-el>
    <nu-el hide={$expanded ? 'yes' : 'no'}>{brand.short_name}</nu-el>
  </nu-heading>
  {#each sidebar as list}
    <nu-heading
      hide={$expanded ? 'no' : 'yes'}
      padding="1"
      text=" w1"
      level="6">
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
	let width

	$:{
		if(width >800 ){
			debugger;
		}
	}
  onMount(() => {
    width = document.body.clientWidth
  })
</script>

<style>
  nu-menu {
    max-width: 370px;
  }
</style>
