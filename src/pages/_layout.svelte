<Layout>
  <slot scoped={{ layoutName, route: $route }} />
</Layout>
<Control />

<script>
  import { route } from '@sveltech/routify'
  let layoutName = 'pages/_layout'
  import Layout from 'co/Layout'
  import Control from 'co/Theme'
</script>
