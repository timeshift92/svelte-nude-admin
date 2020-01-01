

const brands = {}

brands.BRANDS = `
query($limit: Int, $offset: Int,$locales_id:Int){
    brands_aggregate {
      aggregate {
        count
      }
    }
    brands(limit: $limit, offset: $offset,distinct_on: name){
      slug
      name
      id
      brand_images{
        id
        image
        alt
        name
        is_main
      }
    }
}
`;

brands.BRANDS_INSERT =  `
mutation ($slug:String,$name: String, $images: [brand_images_insert_input!]!,$locales_id:Int) {
  insert_brands(objects: {slug:$slug,name: $name, brand_images: {data: $images}}) {
    returning {
      brand_images {
        alt
        name
        id
        image
        is_main
      }
      slug
      name
      id
    }
  }
}

`;

brands.BRANDS_UPDATE =  `
mutation ($slug: String, $id: Int, $name: String, $images: [brand_images_insert_input!]!,$locales_id:Int) {
  insert_brand_images(objects: $images, on_conflict: {constraint: brand_images_pkey, update_columns: []}) {
    affected_rows
  }
  update_brands(_set: {name: $name, slug: $slug}, where: {id: {_eq: $id}}) {
    returning {
      slug
      name
      id
      brand_images {
        id
        image
        alt
        name
        is_main
      }
    }
  }
}
`;

brands.BRANDS_DELETE =  `
mutation ($id: Int, $locales_id:Int) {
  delete_brands(where: {id: {_eq: $id}}) {
    affected_rows
  }
}


`

export default brands;
