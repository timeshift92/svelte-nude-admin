<Section {route}>
  <nu-card width="400px">
    <Pie />
  </nu-card>
</Section>

<script>
  export let scoped
  export let route = scoped.route
  import Pie from 'co/Chart/Pie.svelte'
  import Section from 'co/Base/Section'
</script>
