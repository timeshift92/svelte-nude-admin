<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function getImages() {
    let imgs = data;
    if(!multiple)
    imgs = data[0];
    dispatch("images", imgs);
  }
  let images;
  let selected = 0;
  let data = [];
  export let update = false;
  export let id;
  export let multiple = true;

  $: getImages(data);

  function saveImages() {
    for (var i = 0; i < images.length; i++) {
      let image = images[i];

      getBase64(images[i]).then(res => {
        let img = {};
        img.name = image.name.substr(image.name, image.name.indexOf("."));
        if (update) Object.assign(img,id) ;
        img.is_main = selected == i;
        img.alt = img.name;
        img.image = res;
        img.extension = image.name.substr(image.name.indexOf(".") + 1);
        data = [...data, img];
      });
    }
    setTimeout(() => {
      getImages();
    }, 500);
  }
  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  function check(index) {
    for (var i = 0; i < data.length; i++) {
      if (i != index) {
        data[i].is_main = false;
      }
    }
  }
</script>

<style>
  .image-container {
    border: 1px solid gray;
    display: flex;
    margin-bottom: 5px;
  }
</style>

{#each data as dt, index}
  <div class="image-container">
    <img src={dt.image} alt={dt.name} class="pyrex-crud-image" />
    <div>
      <input type="text" bind:value={dt.name} placeholder="Название" />
      <input type="text" bind:value={dt.alt} placeholder="SEO Тэг" />
      <label for="is_main">Главное изображение</label>
      <input
        name="is_main"
        bind:checked={dt.is_main}
        type="checkbox"
        on:change={() => check(index)} />

    </div>
  </div>
{/each}

<input
  id="input"
  on:change={saveImages}
  bind:files={images}
  type="file"
  multiple />
