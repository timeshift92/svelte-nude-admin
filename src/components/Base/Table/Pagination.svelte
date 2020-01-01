<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleChange(type = "inc", page) {
    if (type === "dec" && offset > 0) {
      offset = offset - limit;
    }
    if (type === "inc") {
      offset = offset + limit;
    }

    if (page) {
      offset = (page - 1) * limit;
    }
    dispatch("change");
  }
  export let total = 0;
  export let limit = 5;
  export let offset = 0;

  let pages = [];

  $: {
    const length = Math.ceil(total / limit);
    pages = Array.apply(null, { length }).map((p, i) => ++i);
  }

  $: isCurrent = page => {
    return offset === (page - 1) * limit;
  };
</script>

<button
  disabled={offset === 0}
  class="
  {offset === 0 ? 'bg-gray-100 ' : 'bg-gray-300 hover:bg-gray-400'}
  text-gray-800 font-bold py-2 px-4 rounded-l"
  on:click={() => handleChange('dec')}>
  Prev
</button>
{#each pages as pg}
  <button
    on:click={() => handleChange('next', pg)}
    class:bg-gray-500={isCurrent(pg)}
    class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4
    border-l border-r border-white">
    {pg}
  </button>
{/each}
<button
  disabled={offset + limit > total }
  class="
  {offset + limit > total  ? 'bg-gray-100 ' : 'bg-gray-300 hover:bg-gray-400'}
  text-gray-800 font-bold py-2 px-4 rounded-r"
  on:click={() => handleChange()}>
  Next
</button>
