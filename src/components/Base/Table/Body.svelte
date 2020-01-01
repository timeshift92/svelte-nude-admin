<nu-rowgroup>
  {#each rows as row}
    <nu-row fill=":even[subtle]" place="center">
      {#each columns as col}
        <nu-cell border="1x" fill=" :hover[red]" text="center">
          {#if typeof row[col.name] == 'function'}
            <svelte:component this={row[col.name]} />
          {:else if col.name.indexOf('image') != -1}
            <nu-block height="200px" width="200px">
              <!-- <Slider images={row[col]} /> -->
            </nu-block>
          {:else if typeof row[col.name] == 'object'}
            {getRow(row, col.name)}
          {:else if  col.name.indexOf('actions') !=-1 }
            <slot id={row.id} {row} name="actions" />
          {:else}{row[col.name] != undefined ? row[col.name] : ''}{/if}
        </nu-cell>
      {/each}
    </nu-row>
  {/each}
</nu-rowgroup>

<script>
  export let rows
  export let columns
  import Slider from '../slider/index.svelte'

  function findDim(arr, param) {
    if (arr[0] != undefined && arr[0][param]) {
      return arr[0][param]
    }
    if (arr[0] == undefined) return
    return findDim(arr[0], param)
  }
  function getKey(data, key) {
    if (!data) return ''
    if (Array.isArray(data)) {
      return getKey(data[0], key)
    } else if (data.name != undefined) {
      return data.name
    } else if (typeof data === 'object') {
      return getKey(data[Object.keys(data)[0]], key)
    } else {
      return data.name || ''
    }
  }

  function getRow(row, col) {
    if (row[col]) {
      return getKey(row[col], 'name')
      // if (Array.isArray(row[col])) {
      //   return findDim(row[col], "name");
      // } else if (row[col].name != undefined) {
      //   return row[col].name;
      // }
      // return "";
    }
  }
</script>

<style>

</style>
