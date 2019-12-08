<canvas id="myChart" width="3" height="1" />
<canvas id="myChart1" width="3" height="1" />
<canvas id="myChart2" width="3" height="1" />
<canvas id="myChart3" width="3" height="1" />
<canvas id="myChart4" width="3" height="1" />
<canvas id="myChart5" width="3" height="1" />

<nu-block id="visitorMap" />

<script>
  import Chart from 'chart.js'
  import { onMount } from 'svelte'
  function createChart(params) {
    var ctx = document.getElementById('myChart').getContext('2d')

    var randomScalingFactor = function() {
      return Math.round(Math.random() * 100)
    }

    var config = {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
            ],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(75, 192, 192)',
              'rgb(201, 203, 207)',
              'rgb(255, 159, 64)',
              'rgb(153, 102, 255)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)',
            ],
            label: 'Dataset 1',
          },
        ],
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      },
      options: {
        responsive: true,
      },
    }

    let chart = new Chart(ctx, config)

    var ctx = document.getElementById('myChart1').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Statistics',
            data: [460, 458, 330, 502, 430, 610, 488],
            borderWidth: 2,
            backgroundColor: '#6777ef',
            borderColor: '#6777ef',
            borderWidth: 2.5,
            pointBackgroundColor: '#ffffff',
            pointRadius: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: '#f2f2f2',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 150,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    })

    var ctx = document.getElementById('myChart2').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Statistics',
            data: [460, 458, 330, 502, 430, 610, 488],
            borderWidth: 2,
            backgroundColor: '#6777ef',
            borderColor: '#6777ef',
            borderWidth: 2.5,
            pointBackgroundColor: '#ffffff',
            pointRadius: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: '#f2f2f2',
              },
              ticks: {
                beginAtZero: true,
                stepSize: 150,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    })

    var ctx = document.getElementById('myChart3').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [80, 50, 40, 30, 20],
            backgroundColor: [
              '#191d21',
              '#63ed7a',
              '#ffa426',
              '#fc544b',
              '#6777ef',
            ],
            label: 'Dataset 1',
          },
        ],
        labels: ['Black', 'Green', 'Yellow', 'Red', 'Blue'],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
      },
    })

    var ctx = document.getElementById('myChart4').getContext('2d')
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [
          {
            data: [80, 50, 40, 30, 100],
            backgroundColor: [
              '#191d21',
              '#63ed7a',
              '#ffa426',
              '#fc544b',
              '#6777ef',
            ],
            label: 'Dataset 1',
          },
        ],
        labels: ['Black', 'Green', 'Yellow', 'Red', 'Blue'],
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
      },
    })

    var statistics_chart = document.getElementById('myChart5').getContext('2d')

    var myChart = new Chart(statistics_chart, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Statistics',
            data: [640, 387, 530, 302, 430, 270, 488],
            borderWidth: 5,
            borderColor: '#6777ef',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#fff',
            pointBorderColor: '#6777ef',
            pointRadius: 4,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                stepSize: 150,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: '#fbfbfb',
                lineWidth: 2,
              },
            },
          ],
        },
      },
    })
  }

  onMount(createChart)
</script>
