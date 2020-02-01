<nu-btngroup value={selectedPage}>
  <nu-btn {...offset === 0 ? { disabled: 'true' } : {}} on:click={e => (offset === 0 ? '' : dec)}>Prev</nu-btn>
  <nu-btn value={1} on:click={() => next(1)}>1</nu-btn>
  {#if selectedPage >= pageSize}
    <nu-btn disabled>...</nu-btn>
  {/if}
  {#each pages as pg}
    <nu-btn checked={isCurrent(pg)} value={pg} on:click={e => next(pg)}>{pg}</nu-btn>
  {/each}
  {#if selectedPage <= tmpPages.length - 5}
    <nu-btn disabled>...</nu-btn>
    <nu-btn value={tmpPages.length} on:click={() => next(tmpPages.length)}>{tmpPages.length}</nu-btn>
  {/if}
  <nu-btn {...selectedPage === tmpPages.length ? { disabled: 'true' } : {}} on:click={inc}>Next</nu-btn>
</nu-btngroup>

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let selectedPage = 1

  function inc() {
    if (selectedPage < tmpPages.length) {
      offset = offset + limit
      dispatch('change')
    }
  }

  function dec() {
    if (offset !== 0) {
      offset = offset - limit
      dispatch('change')
    }
  }
  function next(page) {
    selectedPage = page
    offset = (page - 1) * limit
    dispatch('change')
  }

  export let total = 0
  export let limit = 5
  export let offset = 0
  export let pageSize = 5
  let pages = []
  let tmpPages = []

  $: {
    const length = Math.ceil(total / limit)
    tmpPages = Array.apply(null, { length }).map((p, i) => ++i)
    const page = offset / limit
    pages = tmpPages.slice(page <= pageSize - 2 ? 1 : page - 3, offset / limit + pageSize)
  }

  $: isCurrent = page => {
    if (offset === (page - 1) * limit) selectedPage = page
    return offset === (page - 1) * limit
  }
</script>
