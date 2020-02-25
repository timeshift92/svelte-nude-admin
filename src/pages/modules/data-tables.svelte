<!-- <Section {route} {header} title='Table with api'> -->
  <Product />
<!-- </Section> -->

<script>
  let header = {
    title: 'Table example',
    body: 'fetching data in api',
  }
  import Product from '../../components/product/Index.svelte'
  import Section from 'co/base/Section.svelte'
    export let scoped
  export let route = scoped.route
</script>
