

const reviews = {}

reviews.REVIEWS = `
 query{
  reviews{
    user_id
    description
    created_at
    product{
      product_images{
        image
        alt
        name
        id
        is_main
      }
    }
  }
}

`;



export default reviews;
