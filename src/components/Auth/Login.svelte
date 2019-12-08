<nu-flex
  grow="1"
  width="100%"
  flow="column"
  content="center"
  items="center"
  height="clamp(min-content, 50vh, 42)||auto"
  gap="3|2|1"
  padding="1 2 6||2 1">
  <nu-card>
    <nu-flex
      grow="1"
      width="100%"
      flow="column"
      content="center"
      items="center"
      height="clamp(min-content, 50vh, 42)||auto"
      gap="1|2|1"
      padding="1 2 2||2 1">
      <nu-heading level="1" mod="uppercase" size="h1 3|h2 3|h6 2" flow="column">
        <nu-block>Login</nu-block>
      </nu-heading>
      <nu-icon name="gitlab" size="5|3|2" />

      <nu-block size="lg 2|md 1.5|sm 1.5" />
      <nu-flow padding="1 0 0 0" gap="1">
        <nu-input width="20||14|12" padding=".5 1">
          <input name="login" placeholder="Login" />
        </nu-input>
        <nu-input width="20||14|12" padding=".5 1" nu-responsive="">
          <input
            type="password"
            autocomplete="new-password"
            placeholder="Password" />
        </nu-input>
        <nu-block size="lg 2|md 1.5|sm 1.5" />
        <nu-block size="lg 2|md 1.5|sm 1.5" />
        <nu-btn>Login</nu-btn>
      </nu-flow>
    </nu-flex>
  </nu-card>
</nu-flex>
