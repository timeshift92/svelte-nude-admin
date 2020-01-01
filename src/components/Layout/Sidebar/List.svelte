{#each items as item,index}
  <nu-block
    padding=".5"
    id="block"
    flow="column"
    items="center #sidebar:pressed[inherit]"
    place="center :pressed[inherit]"
    display="flex">
    <nu-menuitem
      bind:this={menu[index]}
      id="item"
      width="50% #sidebar:pressed[auto] :pressed[; box-shadow:3px 5px 4px rgba(1,1,1,0.8);]"
      fill
      color
      theme=" :pressed[violet special]"
      on:click={e => handleClick(e, item.url)}
      role="checkbox"
      items="center"
      content="center #sidebar:pressed[space-between]">
      <nu-icon padding="0 #sidebar:pressed[1]" name={item.icon} />
      <nu-el to={item.url} padding="0" transition="all 1.5s ease-out" hide="yes #sidebar:pressed[no]">
        {item.name}
      </nu-el>
      {#if item.items && item.items.length > 0}
        <nu-icon hide="yes #sidebar:pressed[no]" name="chevron-down ^:pressed[chevron-up]" />
      {:else}
        <nu-icon hide="yes #sidebar:pressed[no]" />
      {/if}
    </nu-menuitem>
    {#if menu && menu[index]}
      <Item   menu ={menu[index]} hide="yes #sidebar:pressed[no]" {startHeight} items={item.items} />
      <nu-block
				class:sidebar-hover={true}
        hide="no #sidebar:pressed[yes]"
        scrollbar
        fill
        color
        height="0 ^:hover[auto; max-height:300px]"
        overflow="scroll-y"
        padding="0 0 0 8px"
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
