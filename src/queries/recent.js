

const recents = {}

recents.RECENTS = `
query($id:[Int!]!,$user_id:uuid,$locales_id:Int,$slug:String,$limit: Int, $offset: Int){
  products_aggregate {
    aggregate {
      count
    }
  }
    products(order_by:{id:desc},limit: $limit, offset: $offset, where:{id:{_in:$id},categories_products:{category:{slug:{_eq:$slug}}}}){
        id
        charge
        product_locales(where:{locales_id:{_eq:$locales_id}}) {
          name
          description
        }
        product_colors{
          color {
        code
        slug
        id
        color_locales {
          name
        }
      }
        }
        favorites(where:{user_id:{_eq:$user_id}, product_id:{_in:$id}},limit:1){
          product_id
        }
        product_images {
          id
        alt
        name
        image
        is_main
        }
        price
        old_price
        rating
    		categories_products {
          category_id
          category{
            category_locales{
              name
            }
          }
        }
        discount
        brand {
          id
          name
        }
        brand_id
        categories_products {
          category {
            id
            slug
            category_locales {
              name
            }
          }
        }
  }
}
`;

export default recents;
