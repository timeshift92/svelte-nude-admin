<script>
  let name = "world";
  import { fade, fly } from "svelte/transition";
  export let images = [];
  let selected = images[0];
  const click = image => {
    selected = false;
    setTimeout(() => {
      selected = image;
    }, 25);
  };
</script>

<div class="bg-yellow-600 flex ">
  <div class="w-8/12 flex">
    {#if selected}
      <img
        in:fly={{ y: 20, duration: 500 }}
        class="w-full h-full"
        src={selected.image}
        alt={selected.alt} />
    {:else}
      <div class="bg-gray-600 w-full h-full flex items-center justify-center">
        No image
      </div>
    {/if}

  </div>
  <!-- {#if images.lenght > 1} -->
  <div
    class="border flex flex-col flex-shrink w-4/12 justify-center items-center">
    {#each images as image}
      <li on:click={() => click(image)} class="list-none cursor-pointer">
        <img class="overflow-hidden " src={image.image} alt={image.alt} />
      </li>
    {/each}
  </div>
  <!-- {/if} -->
</div>
