<nu-flex responsive="1280px|960px|640px" flow="row" >
  <nu-theme hue="250" saturation="auto" padding=".5" border-radius=".5" border-width="1px" animation-time="0.08s" />
  <nu-theme name="violet" from="#6777ef"></nu-theme>

  <Sidebar />
  <nu-grid width="100%" low="column" rows="70px 1fr">
    <Header />
    <slot><!-- optional fallback --></slot>

  </nu-grid>
</nu-flex>

<script>
  import Header from './Header.svelte'
  import Sidebar from './Sidebar'
  import Body from './Body.svelte'
</script>
