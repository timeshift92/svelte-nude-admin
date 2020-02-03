<nu-btngroup value={selectedPage}>
  <nu-btn data-prev value={selectedPage + 1} {...offset === 0 ? { disabled: 'true' } : {}} on:click={dec}>Prev</nu-btn>
  {#each pagination(selectedPage, pageCount) as pg}
    {#if pg == '...'}
      <nu-btn disabled>...</nu-btn>
    {:else}
      <nu-btn checked={isCurrent(pg)} value={pg} on:click={e => next(pg)}>{pg}</nu-btn>
    {/if}
  {/each}
  <nu-btn data-next value={selectedPage + 1} {...selectedPage >= pageCount ? { disabled: 'true' } : {}} on:click={inc}>Next</nu-btn>
</nu-btngroup>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getContext } from 'svelte'
  let { request, total$ } = getContext('CRUD')
  const dispatch = createEventDispatcher()
  let selectedPage = 1
  function removePressed() {
    setTimeout(() => {
      document.querySelector('nu-btn[data-next]').removeAttribute('pressed')
      document.querySelector('nu-btn[data-prev]').removeAttribute('pressed')
    })
  }

  function inc(e) {
    removePressed()
    if (selectedPage < pageCount) {
      offset = offset + limit
      selectedPage++
      update()
    }
  }

  function dec(e) {
    removePressed()
    if (offset !== 0) {
      offset = offset - limit
      selectedPage--
      update()
    }
  }
  function next(page) {
    selectedPage = page
    offset = (page - 1) * limit
    update()
  }

  function update() {
    request.upd()
  }
  let total = 0
  $: total = $total$
  $: pageCount = Math.round(total / limit)
  export let limit = 5
  export let offset = 0

  function pagination(currentPage, pageCount) {
    let delta = 2,
      left = currentPage - delta,
      right = currentPage + delta + 1,
      result = []

    result = Array.from({ length: pageCount }, (v, k) => k + 1).filter(i => i && i >= left && i < right)

    if (result.length > 1) {
      if (result[0] > 1) {
        if (result[0] > 2) {
          result.unshift('...')
        }
        result.unshift(1)
      }
      if (result[result.length - 1] < pageCount) {
        if (result[result.length - 1] !== pageCount - 1) {
          result.push('...')
        }
        result.push(pageCount)
      }
    }

    return result
  }

  $: isCurrent = page => {
    if (offset === (page - 1) * limit) selectedPage = page
    return offset === (page - 1) * limit
  }
</script>
