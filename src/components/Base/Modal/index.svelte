<script>
  import { createEventDispatcher } from "svelte";
  // import { fade } from "svelte/transition";
  let showModal = false;
  export let buttonColor = "bg-blue-500";
  export let buttonName = "Добавить";

  const handleClose = _showModal => {
    showModal = _showModal;
  };

  let buttonHover = () => {
    let clr = buttonColor.split("-");
    clr[2] = "700";

    return clr.join("-");
  };
</script>

<slot name="button">
  <button
    class="add-button-pyrex {buttonColor} hover:{buttonHover()} text-white font-bold py-2 px-3
    rounded"
    on:click={() => (showModal = true)}>
    {buttonName}
  </button>
</slot>

{#if showModal}
  <div
    class="w-full h-full inset-0 fixed bg-gray-800 opacity-25 pyrex-form overflow-auto"
    on:click={() => (showModal = false)} />

  <div
    class="w-full pyrex-modal bg-white inset-0 p-6 border-black rounded fixed
     pyrex-for overflow-auto">
    <button class="float-right pb-1" on:click={() => (showModal = false)}>
      X
    </button>
    <slot handle={handleClose} />

  </div>
{/if}
