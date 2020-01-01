<Section {route} {header} title={'layout'}>
	 This is Example Page This page is just an example for you to create your own page. Example Card Lorem ipsum
        dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  <nu-el slot="footer">This is card footer</nu-el>
</Section>

<script>
  export let header = {
    title: 'This is Example Page',
    body: 'This page is just an example for you to create your own page.',
  }

  export let scoped
  export let route = scoped.route
  import Section from 'co/Base/Section'
</script>
