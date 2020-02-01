<nu-rowgroup>
  <nu-row>
    {#each columns as col, i}
      <nu-columnheader cursor="pointer" role="checkbox" border="1x" text="center">
        <nu-flex gap="0.5" content="center">
          <nu-btn
            role="checkbox"
            width="100%"
            border="0 :focus:pressed:active:hover[0]"
            shadow="0 :focus:hover:pressed[0]">
            <nu-label>{col.title}</nu-label>
            <nu-triangle hidden set="up ^:pressed[down]" place="center" />
          </nu-btn>
        </nu-flex>
      </nu-columnheader>
    {/each}
  </nu-row>
    <slot />
</nu-rowgroup>

<script>
  export let columns
</script>
