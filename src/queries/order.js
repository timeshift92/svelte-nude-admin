

const queries = {}

queries.ORDERS = `
query ($user_id: uuid,$locales_id:Int) {
  orders(where: {status:{_eq:0} user_id: {_eq: $user_id}}) {
    id
    orders_products {
      quantity
      color_id
      product {
        id
        price
        charge
        rest
        product_images {
          image
          id
          alt
          name
        }
        product_locales (where:{locales_id:{_eq:$locales_id}}){
          name
        }
        product_colors {
          color {
            id
            code
            color_locales {
              name
            }
          }
        }
      }
    }
  }
}

`;

queries.ORDERS2 = `
query ($locales_id:Int,$id:Int) {
  orders(where: {id:{_eq:$id}}) {
    id
    status
    orders_products {
      quantity
      color_id
      product {
        id
        price
        charge
        rest
        product_images {
          image
          id
          alt
          name
        }
        product_locales (where:{locales_id:{_eq:$locales_id}}){
          name
        }
        product_colors {
          color {
            id
            code
            color_locales {
              name
            }
          }
        }
      }
    }
  }
}

`;



queries.CARD_INSERT = `
mutation ($product_id: Int, $user_id: uuid, $color_id: Int, $locales_id: Int, $quantity: Int) {
  insert_orders(objects: {user_id: $user_id, orders_products: {data: {product_id: $product_id, color_id: $color_id, quantity: $quantity}}}) {
    affected_rows
  }
}

`;

queries.CARD_UPSERT = `
mutation ($order_id: Int, $product_id: Int, $color_id: Int, $locales_id: Int, $quantity: Int) {
  insert_orders_products(objects: {product_id: $product_id, color_id: $color_id, order_id: $order_id, quantity: $quantity}, on_conflict: {constraint: orders_products_pkey, update_columns: [quantity]}) {
    affected_rows
  }
}

`

queries.CARD_UPDATE = `
mutation ($id: Int!, $status: Int, $transaction_id: String, $locales_id:Int) {
  update_orders(where: {id: {_eq: $id}}, _set: {status: $status, transaction_id: $transaction_id}) {
    affected_rows
  }
}
`

queries.CARD_DELETE = `
mutation ($user_id: uuid!, $id: Int,$locales_id:Int) {
  delete_orders_products(where: {order: {_or: [{user_id: {_eq: $user_id}}, {id: {_eq: $id}}]}}) {
    affected_rows
  }
  delete_orders(where: {_or: [{user_id: {_eq: $user_id}}, {id: {_eq: $id}}]}) {
    affected_rows
  }
}

`

queries.CARD_SUBSCRIPTION = `
subscription ($user_id: uuid!,$locales_id:Int) {
  orders_products_aggregate(where: {order: {status:{_eq:0},user_id: {_eq: $user_id}}}) {
    aggregate {
      count
    }
    nodes {
      quantity

      product {
        price
        charge
        rest
        product_locales(where:{locales_id:{_eq:$locales_id}}){
          name
        }
      }
    }
  }
}
`


queries.ORDERS_LIST = `
query ($locales_id: Int) {
  orders(order_by: {updated_at: desc}) {
    id
    status
    created_at
    orders_products {
      quantity
      color_id
      product {
        id
        price
        product_images {
          image
          id
          alt
          name
        }
        product_locales(where: {locales_id: {_eq: $locales_id}}) {
          name
        }
        product_colors {
          color {
            id
            code
            color_locales {
              name
            }
          }
        }
      }
    }
  }
}


`;

export default queries;
