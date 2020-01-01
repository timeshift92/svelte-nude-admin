

const favorites = {}

favorites.FAVORITES = `
 query ($user_id: uuid, $order_by: products_order_by, $locales_id: Int, $limit: Int, $offset: Int) {
  favorites_aggregate(where: {user_id: {_eq: $user_id}}) {
    aggregate {
      count
    }
  }
  favorites(limit: $limit, offset: $offset, where: {user_id: {_eq: $user_id}}, order_by: {product: $order_by}) {
    product {
      id
      product_locales(where: {locales_id: {_eq: $locales_id}}) {
        name
        description
      }
      product_colors {
        color {
          code
          slug
          id
          color_locales {
            name
          }
        }
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
        category {
          category_locales {
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
}



`;



export default favorites;
