<svelte:head>
  <title>{title}</title>
</svelte:head>
<nu-block overflow="scroll" height="90vh">
  <nu-flex
    flow="row wrap"
    theme="main"
    fill
    color
    content="space-between"
    padding="1"
    items="center"
    shadow="5px"
    height="70px">
    <nu-heading>{title}</nu-heading>
    <Breadcrumb.Section route={route.path} />
  </nu-flex>
  <nu-block padding="1">
    {#if header}
      <nu-flex content="baseline" padding="1" gap="1" items="baseline">
        <nu-el theme="violet swap" color fill radius="5px" height="8px" width="30px" />
        <nu-flex flow="column">
          <nu-heading level="4">{header.title}</nu-heading>
          <nu-block>{header.body}</nu-block>
        </nu-flex>
      </nu-flex>
    {/if}

    <nu-card flow="column" radius="0" gap="2" display="flex">
      <slot />
    </nu-card>
    {#if is_footer}
      <nu-card radius="0" fill="local">
        <slot name="footer" />
      </nu-card>
    {/if}

  </nu-block>

</nu-block>

<script>
  export let title = 'Default'
  export let route
  import Breadcrumb from 'co/Base/Breadcrumb'
  export let header = 'Default'
  let is_footer = $$props.$$slots.footer !== undefined
</script>
