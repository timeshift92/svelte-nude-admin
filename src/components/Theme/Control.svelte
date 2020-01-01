<nu-card place="fixed right bottom" transform="translate(-1rem, -1rem)" padding="1x" size="xs" z="front">
  <nu-flex gap=".5" items="stretch" flow="column">
    <nu-block>Prefers color scheme:</nu-block>
    <nu-btngroup id="prefers-color-scheme" value={theme}>
      <nu-btn on:click={() => setTheme('auto')} value="auto">Auto</nu-btn>
      <nu-btn on:click={() => setTheme('dark')} value="dark">Dark</nu-btn>
      <nu-btn on:click={() => setTheme('light')} value="light">Light</nu-btn>
    </nu-btngroup>
    <nu-block>Prefers contrast:</nu-block>
    <nu-btngroup id="prefers-contrast" value={contrast}>
      <nu-btn on:click={() => setContrast('auto')} value="auto">Auto</nu-btn>
      <nu-btn on:click={() => setContrast('high')} value="high">High</nu-btn>
      <nu-btn on:click={() => setContrast('low')} value="low">Low</nu-btn>
    </nu-btngroup>
  </nu-flex>
</nu-card>

<script>
  let theme = localStorage.getItem('theme')
  let contrast = localStorage.getItem('contrast')
  function setTheme(_theme) {
    localStorage.setItem('theme', _theme)
  }
  function setContrast(_contrast) {
    localStorage.setItem('contrast', _contrast)
  }
</script>
