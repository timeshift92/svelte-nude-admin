<Section {route}>
  <nu-card width="400px">
    <Chart />
  </nu-card>
</Section>

<script>
  import Chart from 'co/Chart'
  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
  }
  import Section from 'co/Base/Section'
  export let scoped
  export let route = scoped.route
</script>
