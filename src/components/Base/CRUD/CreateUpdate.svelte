<script>
  import { query, restore, mutate } from "api.js";
  import { getContext, setContext } from "svelte";
  const { queryName, componentProps, returning } = getContext("CRUD");
  import {
    Field,
    Dropdown,
    Dropdown2,
    Image
  } from "../../../components/Base/Form/index.js";
  export let formType = "create";
  export let row;
  let formData = {};
  let dataPrefix = "insert_";
  let queryPrefix = "_INSERT";
  if (formType === "update") {
    formData["id"] = row.id;
    dataPrefix = "update_";
    queryPrefix = "_UPDATE";
  }

  function getKey(data, key) {
    if (!data) return "";
    if (Array.isArray(data)) {
      return getKey(data[0], key);
    } else if (data.name != undefined) {
      return data.name;
    } else if (typeof data === "object") {
      return getKey(data[Object.keys(data)[0]], key);
    } else {
      return data.name || "";
    }
  }
  componentProps.map(item => {
    if (formType === "update") {
      if (item.path) {
        
        formData[item.name] = row[item.path][0]
          ? row[item.path][0][item.name]
          : "";
      } else if (item.type === "file") {
        formData[item.name] = [];
      } else {
        formData[item.name] = row[item.name];
      }
    } else if (item.value) {
      formData[item.name] = item.value;
    } else {
      formData[item.name] = "";
    }
  });

  export let handleClose;
  export let cache;

  $: getDepend = itemName => {
    return formData[itemName];
  };

  function check_ref_key() {
    let keys = Object.keys(formData);
    keys.map(key => {
      if (key.indexOf("id") != -1 && typeof formData[key] !== "undefined") {
        if (formData[key] < 0 || formData[key] != undefined &&  formData[key].length == 0) {
          delete formData[key];
        }
      }
    });
  }

  function send(e) {
    e.preventDefault();
    let res = async () => {
      check_ref_key();
      if (formData["color_id"]) {
        formData["color_id"] = formData["color_id"].map(c => ({
          color_id: c.id ? c.id : c,
          ...(formData["id"] ? { product_id: formData["id"] } : {})
        }));
      }
      let rest = await mutate(queryName + queryPrefix, { ...formData });

      let finalData = cache.data[queryName.toLowerCase()];
      if (formType == "update") {
        for (let index = 0; index < finalData.length; index++) {
          if (
            finalData[index].id ==
              rest.data[`update_${queryName.toLowerCase()}`].returning[0].id ||
            finalData[index].id ==
              rest.data[`update_${queryName.toLowerCase()}`].returning[0].ids
          )
            finalData[index] =
              rest.data[`update_${queryName.toLowerCase()}`].returning[0];
        }
      } else {
        finalData = [...finalData, rest.data[`${dataPrefix}${queryName.toLowerCase()}`].returning[0]]
      }
      restore(queryName, { [queryName.toLowerCase()]: finalData });
    };
    res();
    handleClose(false);
  }
</script>

<form class="w-full" on:submit={send}>
  <div class="flex flex-wrap -mx-3 mb-6">
    {#each componentProps as prop}
      {#if  prop.type == 'password' || prop.type == 'email' || prop.type == 'text' || prop.type == 'number' ||  prop.type == 'hidden' }
        <Field
          label={prop.label}
          step=0.01
          bind:value={formData[prop.name]}
          type={prop.type}
          autocomplete={prop.autocomplete}
          placeholder={prop.placeholder} />
      {:else if prop.type == 'file'}
        <Image
          multiple={prop.multiple}
          update={formType === 'update'}
          id={{[queryName.toLowerCase().substr(0,queryName.length -1) + '_id']:formData.id} }
          on:images={e => (formData[prop.name] = e.detail)} />
      {:else if prop.type == 'select'}
        <div class="w-full px-3 mt-2 pyrex-select">
          <label for="" class="pyrex-label">{prop.label}</label>
          <Dropdown
            multiple={prop.multiple}
            values= {prop.path && formType == 'update'? row[prop.path]:undefined}
            bind:value={formData[prop.name]}
            id={formData['id']}
            data={prop.data}
            depend={getDepend(prop.depend)} />
        </div>
      {:else if prop.type == 'select2'}
        <div class="w-full px-3 mt-2 pyrex-select">
          <label for="" class="pyrex-label">{prop.label}</label>
          <Dropdown2 bind:value={formData[prop.name]} data={prop.data} />
        </div>
      {/if}
    {/each}

  </div>

  <div class="flex md:items-center justify-end">
    <div class="md:w-2/2">
      <button
        class="shadow bg-green-500 hover:bg-green-900 focus:shadow-outline
        focus:outline-none text-w te font-bold py-2 px-4 rounded"
        type="submit">
        Добавить
      </button>
    </div>
  </div>
</form>
