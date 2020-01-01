<nu-flex transition="all 1.5s" overflow="no" responsive="1280px|960px|640px" flow="row" height="100vh">
  <nu-theme hue="250" saturation="auto" padding=".5" border-radius=".5" border-width="1px" animation-time="0.08s" />
  <nu-theme name="violet" hue="277" />
  <nu-theme name="local" hue="277" />

  <Sidebar />
  <nu-grid overflow="no" width="100%" low="column" rows="70px 1fr">
    <Header />
    <slot>
      <!-- optional fallback -->
    </slot>

  </nu-grid>
</nu-flex>

<script>
  import Header from './Header.svelte'
  import Sidebar from './Sidebar'
  import Body from './Body.svelte'
  import { init } from './helpers/theme-control.js'
  import { onMount } from 'svelte'
  onMount(() => {
    init()
  })
</script>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
