<Layout>
  <slot scoped={{ layoutName }} />
</Layout>
<Control />

<script>
  let layoutName = 'pages/_layout'
  import Layout from 'co/Layout'
  import Control from 'co/Theme'
</script>
