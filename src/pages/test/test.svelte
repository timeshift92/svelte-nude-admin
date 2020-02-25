<svelte:head>
  <title>Default</title>
</svelte:head>
<nu-flex
  theme="main"
  fill
  color
  content="space-between"
  padding="0 1 0 1"
  items="center"
  shadow="5px"
  height="70px">
  <nu-heading>Default</nu-heading>
  <Breadcrumb.Section route={route.path} />
</nu-flex>
<nu-card  flow="column" gap="2">
  <nu-flex content="baseline" padding="1 0 0 1" gap="1" items="baseline">
    <nu-el
      theme="violet swap"
      color
      fill
      radius="5px"
      height="8px"
      width="30px" />
    <nu-flex flow="column">
      <nu-heading level="4">This is Example Page</nu-heading>
      <nu-block>
        This page is just an example for you to create your own page.
      </nu-block>
    </nu-flex>
  </nu-flex>
  <nu-card gap=".5">
    This is Example Page This page is just an example for you to create your own
    page. Example Card Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum. This is card footer
  </nu-card>
</nu-card>

<script>
  export let route
  import Breadcrumb from 'co/base/Breadcrumb'
</script>
