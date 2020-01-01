
const UPDATE_BRAND_IMAGES = `
mutation ($id: Int, $image: String) {
  update_brand_images(_set: {image: $image}, where: {id: {_eq: $id}}) {
    affected_rows
  }
}

  
`;

const  UPDATE_SLIDER_IMAGES = `
mutation ($id: Int, $image: String) {
  update_slider_images(_set: {image: $image}, where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

const UPDATE_PRODUCT_IMAGES = `
mutation ($id: Int, $image: String) {
    update_product_images(_set: {image: $image}, where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
  
    
`;

module.exports = {
  UPDATE_BRAND_IMAGES,
  UPDATE_PRODUCT_IMAGES,
  UPDATE_SLIDER_IMAGES
}
