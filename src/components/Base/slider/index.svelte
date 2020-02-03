<nu-flex height="100px" content="space-around">
  <nu-flex place="center">
    {#if selected}
      <nu-img
        width="100px"
        height="100px"
        in:fly={{ y: 20, duration: 500 }}
        class="w-full h-full"
        src={selected.image}
        alt={selected.alt} />
    {:else}
      <nu-block>No image</nu-block>
    {/if}

  </nu-flex>
  <nu-flex flow="column">
    {#each images as image}
      <nu-img
        cursor="pointer"
        on:click={() => click(image)}
        width="25px"
        height="25px"
        class="overflow-hidden "
        src={image.image}
        alt={image.alt} />
    {/each}
  </nu-flex>
</nu-flex>

<script>
  let name = 'world'
  import { fade, fly } from 'svelte/transition'
	export let images = []
  let selected = images[0]
  const click = image => {
    selected = false
    setTimeout(() => {
      selected = image
    }, 25)
  }
</script>
