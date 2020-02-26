{#each items as item,index}
  <nu-block
		style="position:relative"
    padding=".5"
    id="block"
    flow="column"
    items="^#sidebar :pressed[inherit] center "
    place=":pressed[inherit] center "
    display="flex">
    <nu-menuitem
      bind:this={menu[index]}
			shadow="^ :pressed[0 4px 8px #a1c2fb] "

      id="item"
      width="^#sidebar  :pressed[; box-shadow:3px 5px 4px rgba(1,1,1,0.8);] 50% "
      fill

      theme=" :pressed[violet special]"
      on:click={e => handleClick(e, item.url)}
      role="checkbox"
      items="center"
      content="^#sidebar :pressed[space-between] center ">
      <nu-icon padding="^#sidebar :pressed[1] 0 " name={item.icon} />
      <nu-el to={item.url} padding="0" transition="all 1.5s ease-out" hide="^#sidebar :pressed[no] yes ">
        {item.name}
      </nu-el>
      {#if item.items && item.items.length > 0}
        <nu-icon hide="^#sidebar :pressed[no] yes" name="^ :pressed[chevron-up] chevron-down" />
      {:else}
        <nu-icon hide="^#sidebar :pressed[no] yes" />
      {/if}
    </nu-menuitem>
    {#if menu && menu[index]}
      <Item   menu ={menu[index]} hide="^#sidebar :pressed[no] yes" {startHeight} items={item.items} />
      <nu-block
				class:sidebar-hover={true}
        hide="^#sidebar :pressed[yes] no "
        scrollbar
        fill
        color
        height="^ :hover[60vh] 0 "
        overflow="scroll-y"

        shadow="10px"
        place="outside-right top">
        <Item   type="hover" {startHeight} items={item.items} />
      </nu-block>
    {/if}

  </nu-block>
{/each}

<script>
  import { go } from '../helper.js'
  import { expanded } from '../store'
  import { applyEffect } from 'RevealEffect'

  function handleClick(e) {
    addRemovePressedAttribute(e.currentTarget.parentNode)
  }

  let startHeight = 'auto'

  let height
  let menu = []

  import { addRemovePressedAttribute } from '../helper.js'
  import Item from './Item.svelte'
	export let items = []
</script>
