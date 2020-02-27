<nu-flex   overflow="no" responsive="1280px|960px|640px" flow="row" height="100vh">
  <nu-theme from="#7434c8" saturation="auto" padding=".5" border-radius=".5" border-width="1px" animation-time="0.08s" />
  <nu-theme name="fuchsia" from="#FD49A0" />
  <nu-theme name="aqua" from="#B4FEE7" />
  <nu-theme name="violet" from="#603F8B" />
  <nu-theme name="error" from="#DC0037" />
  <nu-theme name="success" hue="#1DB700" />
  <nu-theme name="warning" hue="#FAD02C" />

  <Sidebar />
  <nu-grid overflow="no" width="100%" low="column" rows="70px 1fr">
    <Header />
    <Section >
      <slot>
        \t This is Example Page This page is just an example for you to create your own page. Example Card Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </slot>
      <nu-el slot="footer">This is card footer</nu-el>
    </Section>
  </nu-grid>
</nu-flex>

<script>

  import Header from './Header.svelte'
  import Sidebar from './Sidebar'
  import Body from './Body.svelte'
  import { init } from './helpers/theme-control.js'
  import { onMount } from 'svelte'
  import Section from 'co/base/Section.svelte'

  onMount(() => {
    init()
  })
</script>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
