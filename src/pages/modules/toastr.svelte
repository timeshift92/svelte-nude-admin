{#if change}
  <Toast theme="violet tint" bind:postion bind:color bind:fill bind:duration>{body}</Toast>
{/if}

<nu-flex gap="1">
  <nu-btngroup on:input={e => handleClick(e.detail)} role="button">
    <nu-btn value="top" role="button">TOP</nu-btn>
    <nu-btngroup on:input={e => handleClick(e.detail)} role="button" flow="column">
      <nu-btn value="right">RIGHT</nu-btn>
      <nu-btn value="center">CENTER</nu-btn>
      <nu-btn value="left">LEFT</nu-btn>
    </nu-btngroup>
    <nu-btn value="bottom">BOTTOM</nu-btn>
  </nu-btngroup>

  <nu-flex flow="column">
    <label for="color">text color</label>
    <nu-input width="50px" height="50px">
      <input style="height:auto" id="color" type="color" bind:value={color} />
    </nu-input>
    {color}
  </nu-flex>
  <nu-flex flow="column">
    <label for="fill">background color</label>
    <nu-input width="50px" height="50px">
      <input id="fill" style="height:auto" type="color" bind:value={fill} />
    </nu-input>
    {fill}
  </nu-flex>
  <nu-card id="card--114" nu-id="card" nu="">
    <nu-attrs
      for="fancy-tooltip"
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
      place="outside-top left" />
    <nu-input placeholder=" ">
      <nu-tooltip
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
        Body
      </nu-tooltip>
      <input bind:value={body} placeholder=" " />
    </nu-input>
  </nu-card>
  <nu-numinput
    on:change={e => {
      duration = parseInt(e.currentTarget.nuValue)
    }}
    min="0"
    max="100"
    precision="0"
    width="8"
    label="Percents input" />
		<nu-btn on:click={handleChange}> Set </nu-btn>
</nu-flex>

<script>
  // import Toast from 'co/base/Toast.svelte'
  import Toast from '../../components/base/Toast.svelte'
  import { header$ } from 'stores'
  let pos = ['top']
  let color = ''
  let fill = ''
  let body = 'Hello world'
  let duration = 0
  let change = true
  function handleClick(type) {
    if (['top', 'bottom'].includes(type)) {
      pos[0] = type
    } else if (['left', 'right', 'center'].includes(type)) {
      pos[1] = type
    }

    postion = pos.join(' ')
  }
  let postion = 'top'
  $header$ = {
    title: 'Toasts',
    header: { title: 'Toasts', body: 'Samples for Toasts' },
  }

  $: if (duration !== false) {
    handleChange()
  }

  function handleChange() {
    change = false
    setTimeout(() => {
      change = true
    }, 350)
  }

</script>
