<script>
  import { restore, mutate } from "api.js";
  import { getContext } from "svelte";
  const { queryName } = getContext("CRUD");

  export let id;
  export let cache;
  export let handleClose;
  function send(e) {
    e.preventDefault();
    let res = mutate(`${queryName}_DELETE`, { id });
    let finalData = cache.data[queryName.toLowerCase()];
    finalData = finalData.filter(function(item) {
      return item.id !== id;
    });
    restore(queryName, { [queryName.toLowerCase()]: finalData });
    handleClose(false);
  }
</script>

<form class="w-full max-w-lg" on:submit={send}>
  <div class="flex md:items-center justify-between">

    <div class="md:w-1/2">Данные удалятся без возвратно!</div>
    <div class="md:w-2/3">
      <button
        class="shadow bg-green-500 hover:bg-green-900 focus:shadow-outline
        focus:outline-none text-white font-bold py-2 px-2 rounded"
        type="submit">
        Вы уверены?
      </button>
    </div>
  </div>
</form>
