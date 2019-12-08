{#each items as item, index}
  <nu-block
    padding=".5"
    id="block"
    flow="column"
    items="{$expanded ? 'inherit' : 'center'}
    "
    place="center :pressed[inherit]"
    display="flex ">
    <nu-menuitem
      bind:this={menu}
      id="item"
      width="50% #sidebar:pressed[auto] :pressed[; box-shadow:3px 5px 4px
      rgba(1,1,1,0.8);]"
      fill
      color
      theme=" :pressed[violet special]"
      on:click={e => handleClick(e, item.url)}
      role="checkbox"
      items="center"
      content="center #sidebar:pressed[space-between]">
      <nu-icon padding="0 #sidebar:pressed[1]" name={item.icon} />
      <nu-el to={item.url} padding="0" hide={$expanded ? 'no' : 'yes'}>
        {item.name}
      </nu-el>
      {#if item.items && item.items.length > 0}
        <nu-icon
          hide={$expanded ? 'no' : 'yes'}
          name="chevron-down ^:pressed[chevron-up]" />
      {:else}
        <nu-icon hide={$expanded ? 'no' : 'yes'} />
      {/if}
    </nu-menuitem>
    {#if $expanded}
      <Item {startHeight} items={item.items} />
    {:else}
      <nu-block
				fill
				color
        height="0 ^:hover[auto; max-height:300px]"
        overflow="scroll-x"
        padding="0 0 0 8px"
        shadow="10px"
        place="outside-right top">
        <Item {startHeight} items={item.items} />
      </nu-block>
    {/if}
  </nu-block>
{/each}

<script>

  import { go } from '../helper.js'
  import { expanded } from '../store'
  import { onMount } from 'svelte'

  function handleClick(e) {
    addRememovePressedAttribute(e.currentTarget.parentNode)
  }
  let startHeight = 'auto'

  setTimeout(() => {
    startHeight = 0
  }, 50)
  let height
  let menu
  import { addRememovePressedAttribute } from '../helper.js'
  import Item from './Item.svelte'
  export let items = []
</script>
