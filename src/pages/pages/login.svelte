

<nu-card display="flex" responsive="1280px|960px|640px" gap="1" theme="main" border="top 2px solid color(special-bg)" width="350px" shadow="2x">
  <nu-theme from="#A16AE8" saturation="auto" padding=".5" border-radius=".5" border-width="1px" animation-time="0.08s" />
  <nu-theme name="fuchsia" from="#FD49A0" />
  <nu-theme name="aqua" from="#B4FEE7" />
  <nu-theme name="violet" from="#603F8B" />
  <nu-theme name="error" from="#DC0037" />
  <nu-theme name="success" hue="#1DB700" />
  <nu-theme name="warning" hue="#FAD02C" />
  <nu-flex gap="2" border="1 1 0 1" radius="1 1 0 0">
    <nu-heading level="5" fill color="var(--nu-focus-color)">Login</nu-heading>
  </nu-flex>
  <nu-line />
  <nu-flex display="flex" flow="column" gap="2" padding="2 0 0 0" radius="0" border="0 1 1 1">
    <nu-input shadow="0" placeholder=" " describedby="tooltip">
      <nu-tooltip
        theme="tint"
        as="fancy-tooltip"
        width="min(11em)"
        opacity="^ :tooltip:empty[1] :empty[.5] 1"
        border="^ :tooltip:empty[1b] :empty[0] 1b"
        size="^ :tooltip:empty[xs] :empty[md] xs"
        radius="1r 1r 0 0"
        move="^ :tooltip:empty[1r 0] :empty[1r 4.5x] 1r 0"
        transition="move, size, border, color"
        fill="^ :tooltip:empty[input] :empty[clear] input"
        color="^ :tooltip:empty[text] :empty[focus] text"
        shadow="0"
        text="nowrap"
        place="outside-top left">
        Email
      </nu-tooltip>
      <input placeholder="" />
    </nu-input>
    <nu-input placeholder=" " describedby="tooltip">
      <nu-link place="outside-top right" shadow="0" text=" :hover[w2 u] w2 no-decoration" padding="0 1px 0 1">forgot password</nu-link>
      <nu-tooltip
        theme="tint"
        as="fancy-tooltip"
        width="min(11em)"
        opacity="^ :tooltip:empty[1] :empty[.5] 1"
        border="^ :tooltip:empty[1b] :empty[0] 1b"
        size="^ :tooltip:empty[xs] :empty[md] xs"
        radius="1r 1r 0 0"
        move="^ :tooltip:empty[1r 0] :empty[1r 4.5x] 1r 0"
        transition="move, size, border, color"
        fill="^ :tooltip:empty[input] :empty[clear] input"
        color="^ :tooltip:empty[text] :empty[focus] text"
        shadow="0"
        text="nowrap"
        place="outside-top left">
        Password
      </nu-tooltip>

      <input placeholder="" />
    </nu-input>
  </nu-flex>
  <!-- <nu-line></nu-line> -->
  <nu-btn>Login</nu-btn>
</nu-card>

<style>
  nu-card {
  }
</style>



