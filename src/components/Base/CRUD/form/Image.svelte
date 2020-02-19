<nu-block use:events use:attrs={$$props}>
  <nu-grid columns="repeat(4,1fr)" gap="2">
    {#each data as dt, index}
      <nu-flex gap="2">
        <nu-icon
          size="lg"
          name="x-square"
          on:click={() => {
            data[index]._delete = true
            value = data
            data = data.filter((item, i) => index != i)
            dispatch('change')
          }} />
        <img width="20%" src={dt.image} alt={dt.name} />
        <nu-flex flow="column">
          <input name={`${name}[${fields[0]}]`} type="text" bind:value={dt.name} placeholder="Название" />
          <input name={`${name}[${fields[3]}]`} type="text" bind:value={dt.alt} placeholder="SEO Тэг" />
          <nu-el display="inline-flex">
            <input name={`${name}[${fields[5]}]`} bind:checked={dt.is_main} type="checkbox" on:change={() => check(index)} />
            <nu-label padding="0 0 0 5px" for="is_main">Главное изображение</nu-label>
          </nu-el>
        </nu-flex>
      </nu-flex>
    {/each}
  </nu-grid>
  <input id="input" name={`${name}[${fields[2]}]`} bind:files={images} type="file" {...multiple ? { multiple: true } : {}} />
</nu-block>

<script>
  import { createEventDispatcher } from 'svelte'
  import { getEventsAction, getAttributesAction } from 'utils.js'
  import { current_component } from 'svelte/internal'
  const events = getEventsAction(current_component)
  const attrs = getAttributesAction(current_component)
  const dispatch = createEventDispatcher()

  let images
  let selected = 0
  export let value, fields, name
  let data = value || []

  export let update = false
  export let id
  export let multiple = false

  $: if (images) {
    saveImages()
  }
  function saveImages() {
    for (var i = 0; i < images.length; i++) {
      let image = images[i]

      getBase64(images[i]).then(res => {
        let img = {}
        img.name = image.name.substr(image.name, image.name.indexOf('.'))
        if (update) Object.assign(img, id)
        img.is_main = selected == i
        img.alt = img.name
        img.image = res

        img._create = true
        img.extension = '.' + image.name.slice((Math.max(0, image.name.lastIndexOf('.')) || Infinity) + 1)
        data = [...data, img]
        value = data
        dispatch('change', data)
      })
    }
  }
  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  function check(index) {
    for (var i = 0; i < data.length; i++) {
      if (i != index) {
        data[i].is_main = false
      }
    }
  }
</script>
