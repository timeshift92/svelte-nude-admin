<nu-btngroup value={selectedPage}>
  <nu-btn disabled={offset === 0} on:click={e => (offset === 0 ? '' : handleChange('dec'))}>Prev</nu-btn>
  {#each pages as pg}
    <nu-btn value={pg} on:click={() => (selectedPage === pg ? '' : handleChange('next', pg))}>{pg}</nu-btn>
  {/each}
  <nu-btn disabled={offset + limit > total} on:click={e => (offset + limit > total ? '' : handleChange())}>Next</nu-btn>
</nu-btngroup>

<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  let selectedPage = 1
  function handleChange(type = 'inc', page) {
    if (type === 'dec' && offset > 0) {
      offset = offset - limit
    }
    if (type === 'inc') {
      offset = offset + limit
    }

    if (page) {
      offset = (page - 1) * limit
    }
    dispatch('change')
  }
  export let total = 0
  export let limit = 5
  export let offset = 0

  let pages = []

  $: {
    const length = Math.ceil(total / limit)
    pages = Array.apply(null, { length }).map((p, i) => ++i)
  }

  $: isCurrent = page => {
    if (offset === (page - 1) * limit) selectedPage = page
    return offset === (page - 1) * limit
  }
</script>
