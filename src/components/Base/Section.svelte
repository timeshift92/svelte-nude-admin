<svelte:head>
  <title>{$header$.title}</title>
</svelte:head>
{#if !$header$.disable}
  <nu-block overflow="scroll-y" scrollbar >
    <nu-flex flow="row wrap"  fill color content="space-between" padding="1" items="center" shadow="5px" height="70px">
      <nu-heading>{$header$.title}</nu-heading>
      <Breadcrumb.Section />
    </nu-flex>
    <nu-block padding="1">
      {#if $header$.header}
        <nu-flex content="baseline" padding="1" gap="1" items="baseline">
          <nu-el theme="violet swap" color fill radius="5px" height="8px" width="30px" />
          <nu-flex flow="column">
            <nu-heading level="4">{$header$.header.title}</nu-heading>
            <nu-block>{$header$.header.body}</nu-block>
          </nu-flex>
        </nu-flex>
      {/if}
      <nu-card radius="1x 1x 0 0" flow="column"  gap="2" display="flex">
        <slot />
      </nu-card>
      {#if is_footer}
        <nu-card radius="0 0 1x 1x" border="bottom right left 1px" >
          <slot name="footer" />
        </nu-card>
      {/if}
    </nu-block>
  </nu-block>
	{:else}
		<slot><!-- optional fallback --></slot>

{/if}

<script>

  import { header$ } from 'stores'

  import Breadcrumb from 'co/base/Breadcrumb'

  let is_footer = $$props.$$slots.footer !== undefined
</script>
