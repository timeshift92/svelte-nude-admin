<script>
  export let data, value;
  export let values;
  export let multiple = false;
  if (values && multiple) {
    
    let vls = [];
    for (let i = 0; i < values.length; i++) {
       vls.push(values[i][data.name.toLowerCase().substr(0,data.name.length - 1)].id);
      
    }
    value = vls;
  }
  export let depend;
  export let id;
  $: preload = data.preload(depend);

 
  const queryName = data.name;

  function getLabel(item) {
    if (data.fieldName) {
      if (data.fieldName.indexOf(".") != -1) {
        let lbl = data.fieldName.split(".");
        return item[lbl[0]][0][lbl[1]];
      }
      return item[lbl];
    } else {
      return item.name;
    }
  }
</script>

{#await $preload}
  Загрузка
{:then dt}
  <div class="inline-block relative w-64">

    {#if multiple}
      <select
        multiple
        bind:value
        class="block appearance-none w-full bg-white border border-gray-400
        hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight
        focus:outline-none focus:shadow-outline">
        {#each dt.data[queryName.toLowerCase()] as item}
          console.log(dt.data)
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {:else}
      <select
        bind:value
        class="block appearance-none w-full bg-white border border-gray-400
        hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight
        focus:outline-none focus:shadow-outline">
        <option selected disabled />
        {#each dt.data[queryName.toLowerCase()] as item}
          console.log(dt.data)
          <option value={item.number || item.id}>{getLabel(item)}</option>
        {/each}

      </select>
    {/if}

    <div
      style="height:5px"
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center
      px-2 text-gray-700">
      <!-- <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586
          4.343 8z" />
      </svg> -->
    </div>
  </div>
{:catch error}
  {error}
{/await}
