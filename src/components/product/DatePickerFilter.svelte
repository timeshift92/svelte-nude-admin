<nu-flex content="space-around" gap="2">
  <Datepicker bind:date={date_start} />
  <Datepicker bind:date={date_end} />
</nu-flex>

<script>
  export let filterChange
  export let filterClear

  let selectedTab = 'orders'

  import Datepicker from 'co/Datepicker'

  let date_start = null //new Date(new Date().setHours(0, 0, 0, 0))
  let date_end = null //new Date(new Date().setHours(23, 59, 59, 99))

  $: if ((date_start, date_end)) {
    filterChange({ created_at: { _gte: date_start, _lte: date_end } })
  } else {
    filterClear('created_at')
  }
</script>
