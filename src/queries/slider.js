

const sliders = {}

sliders.SLIDERS =  `
query ($locales_id: Int,$limit: Int, $offset: Int) {
  sliders(limit: $limit, offset: $offset,order_by: {sort: asc}) {
    slider_locales(where: {locales_id: {_eq: $locales_id}}) {
      description
      title
    }
    slider_images {
      alt
      name
      id
      image
      is_main
    }
    sort
    link
    id
  }
}

`
sliders.SLIDERS_UPDATE =  `
mutation ($id: Int, $description: String,$link:String, $title: String, $sort: Int, $images: [slider_images_insert_input!]!, $locales_id: Int) {
  insert_slider_images( objects:  $images, on_conflict:{constraint:slider_images_pkey, update_columns:[image]}  ) {
    affected_rows
  }
  update_slider_locales(where: {locales_id: {_eq: $locales_id}}, _set: {title: $title, description: $description}) {
    affected_rows
  }
  update_sliders(where: {id: {_eq: $id}}, _set: {link:$link,sort: $sort}) {
    returning {
      slider_locales(where: {locales_id: {_eq: $locales_id}}) {
        description
        title
      }
      slider_images {
        alt
        name
        id
        image
        is_main
      }
      sort
      link
      id
    }
  }
}


`

sliders.SLIDERS_DELETE = `
mutation ($id: Int,$locales_id:Int) {
  delete_sliders(where: {id: {_eq: $id}}) {
    affected_rows
  }
}

`

sliders.SLIDERS_INSERT =  `
mutation ($description: String, $title: String, $sort: Int,$link:String, $images: slider_images_insert_input!, $locales_id: Int) {
  insert_sliders(objects: {link:$link,slider_locales: {data: {description: $description, title: $title, locales_id: $locales_id}}, slider_images: {data: [$images]}, sort: $sort}) {
    returning {
      slider_locales(where: {locales_id: {_eq: $locales_id}}) {
        description
        title
      }
      slider_images {
        alt
        name
        id
        image
        is_main
      }
      sort
      link
      id
    }
  }
}




`

export default sliders;
