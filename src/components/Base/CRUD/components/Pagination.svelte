<nu-btngroup value={selectedPage}>
  <nu-btn data-prev value={selectedPage + 1} {...offset === 0 ? { disabled: 'true' } : {}} on:click={dec}>{pagination.next || 'Prev'}</nu-btn>
  {#each createPagination(selectedPage, pageCount) as pg}
    {#if pg == '...'}
      <nu-btn disabled>...</nu-btn>
    {:else}
      <nu-btn data-page value={pg} on:click={e => next(pg)}>{pg}</nu-btn>
    {/if}
  {/each}
  <nu-btn data-next value={selectedPage + 1} {...selectedPage >= pageCount ? { disabled: 'true' } : {}} on:click={inc}>{pagination.next || 'Next'}</nu-btn>
</nu-btngroup>

<script>
  export let limit = 15

  import { getContext } from 'svelte'
  let { request, total$, offset$, pagination } = getContext('CRUD')

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
    removePressed()
    setTimeout(() => {
      document.querySelectorAll('nu-btn[data-page]').forEach(c => c.removeAttribute('pressed'))
      document.querySelector(`nu-btn[value="${page}"`).setAttribute('pressed', true)
    }, 120)

    selectedPage = page
    offset = (page - 1) * limit
    update()
  }

  function update() {
    setTimeout(() => {
      request.upd()
    }, 50)
  }
  let total = 0
  let offset = 0
  let selectedPage = 1
  $: total = $total$
  offset = $offset$
  $: offset$.set(offset)
  $: pageCount = Math.ceil(total / limit)

  function createPagination(currentPage, pageCount) {
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
</script>
