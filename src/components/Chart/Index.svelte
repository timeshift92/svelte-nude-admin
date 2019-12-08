<canvas bind:this={canvas} width="3" height="1" />

<script>
  let canvas
  import Chart from 'chart.js'
  import { onMount } from 'svelte'
  export let config
  function createChart(params) {
    let chart = new Chart(canvas.getContext('2d'), config)
  }

  onMount(createChart)
</script>
