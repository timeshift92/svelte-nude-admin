<Section {route}>
  <nu-grid columns="repeat(2,1fr)" rows="auto" gap="2">
    <nu-card width="400px">
      <Chart
        config={{ type: 'pie', data: { datasets: [{ data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()], backgroundColor: ['rgb(54, 162, 235)', 'rgb(75, 192, 192)', 'rgb(201, 203, 207)', 'rgb(255, 159, 64)', 'rgb(153, 102, 255)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)'], label: 'Dataset 1' }], labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'] }, options: { responsive: true } }} />
    </nu-card>
    <nu-card width="400px">
      <Chart
        config={{ type: 'line', data: { labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], datasets: [{ label: 'Statistics', data: [460, 458, 330, 502, 430, 610, 488], borderWidth: 2, backgroundColor: '#6777ef', borderColor: '#6777ef', borderWidth: 2.5, pointBackgroundColor: '#ffffff', pointRadius: 4 }] }, options: { legend: { display: false }, scales: { yAxes: [{ gridLines: { drawBorder: false, color: '#f2f2f2' }, ticks: { beginAtZero: true, stepSize: 150 } }], xAxes: [{ ticks: { display: false }, gridLines: { display: false } }] } } }} />
    </nu-card>
    <nu-card width="400px">
      <Chart
        config={{ type: 'doughnut', data: { datasets: [{ data: [80, 50, 40, 30, 20], backgroundColor: ['#191d21', '#63ed7a', '#ffa426', '#fc544b', '#6777ef'], label: 'Dataset 1' }], labels: ['Black', 'Green', 'Yellow', 'Red', 'Blue'] }, options: { responsive: true, legend: { position: 'bottom' } } }} />
    </nu-card>
    <nu-card width="400px">
      <Chart
        config={{ type: 'line', data: { labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], datasets: [{ label: 'Statistics', data: [640, 387, 530, 302, 430, 270, 488], borderWidth: 5, borderColor: '#6777ef', backgroundColor: 'transparent', pointBackgroundColor: '#fff', pointBorderColor: '#6777ef', pointRadius: 4 }] }, options: { legend: { display: false }, scales: { yAxes: [{ gridLines: { display: false, drawBorder: false }, ticks: { stepSize: 150 } }], xAxes: [{ gridLines: { color: '#fbfbfb', lineWidth: 2 } }] } } }} />
    </nu-card>
  </nu-grid>
</Section>

<script>
	export let scoped
  export let route = scoped.route
	import Chart from 'co/Chart'
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
  }
  import Section from 'co/Base/Section'

</script>
