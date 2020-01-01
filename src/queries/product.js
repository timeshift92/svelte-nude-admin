

const queries = {}
queries.PRODUCTS_DELETE = `
  mutation($id:Int!,$locales_id:Int){
  delete_products(where:{id:{_eq:$id}}){
    affected_rows
  }
}
  `

queries.PRODUCTS_INSERT = `
mutation ($category_id: Int, $rest: Int, $charge: float8, $description: String, $article: String, $name: String, $price: float8, $old_price: float8, $brand_id: Int, $images: [product_images_insert_input!]!, $discount: smallint, $locales_id: Int, $color_id: [product_colors_insert_input!]!) {
  insert_products(objects: {rest: $rest, charge: $charge, article: $article, product_colors: {data: $color_id}, categories_products: {data: {category_id: $category_id}}, brand_id: $brand_id, discount: $discount, price: $price, old_price: $old_price, product_locales: {data: {description: $description, name: $name, locales_id: $locales_id}}, product_images: {data: $images}}) {
    returning {
      id
      rest
      charge
      article
      product_locales {
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
      discount
      brand {
        id
        name
      }
      brand_id
      categories_products {
        category_id
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
queries.PRODUCTS_UPDATE = `
mutation ($id: Int, $article: String, $charge: float8, $rest: Int, $category_id: Int, $images: [product_images_insert_input!]!, $color_id: [product_colors_insert_input!]!, $description: String, $name: String, $price: float8, $old_price: float8, $brand_id: Int, $discount: smallint, $locales_id: Int) {
  insert_product_images(objects: $images, on_conflict: {constraint: product_images_pkey, update_columns: []}) {
    affected_rows
  }
  update_categories_product(_set: {category_id: $category_id}, where: {product_id: {_eq: $id}}) {
    affected_rows
  }
  insert_product_colors(objects: $color_id, on_conflict: {constraint: product_colors_pkey, update_columns: []}) {
    affected_rows
  }
  update_product_locales(_set: {name: $name, description: $description}, where: {product_id: {_eq: $id}, locales_id: {_eq: $locales_id}}) {
    affected_rows
  }
  update_products(where: {id: {_eq: $id}}, _set: {charge: $charge, article: $article, rest: $rest, brand_id: $brand_id, discount: $discount, price: $price, old_price: $old_price}) {
    returning {
      ids: id
      rest
      charge
      article
      product_locales {
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
      discount
      brand {
        name
      }
      categories_products {
        category_id
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

queries.PRODUCTS = `
query ($id: Int, $name: String, $brandName: String, $user_id: uuid, $locales_id: Int, $slug: String, $limit: Int, $offset: Int) {
  products_aggregate(where: {brand: {name: {_ilike: $brandName}}, product_locales: {name: {_ilike: $name}}, id: {_eq: $id}, categories_products: {category: {slug: {_eq: $slug}}}}) {
    aggregate {
      count
    }
  }
  products(order_by: {id: desc}, limit: $limit, offset: $offset, where: {brand: {name: {_ilike: $brandName}}, product_locales: {name: {_ilike: $name}}, id: {_eq: $id}, categories_products: {category: {slug: {_eq: $slug}}}}) {
    id
    rest
    article
    charge
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
    favorites(where: {user_id: {_eq: $user_id}, product_id: {_eq: $id}}, limit: 1) {
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
`;

queries.PRODUCTS_INDEX = `
query ($id: Int, $user_id: uuid, $locales_id: Int, $slug: String, $limit: Int, $offset: Int) {
  products_aggregate {
    aggregate {
      count
    }
  }
  products(order_by: {created_at: desc}, limit: $limit, offset: $offset, where: {id: {_eq: $id}, categories_products: {category: {slug: {_eq: $slug}}}}) {
    id
    rest
    article
    charge
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
    favorites(where: {user_id: {_eq: $user_id}, product_id: {_eq: $id}}, limit: 1) {
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

`;

queries.PRODUCTS_WITH_PAGINATE = `
 query ($id: Int, $locales_id: Int, $user_id: uuid, $name: String, $slug: String, $order_by: [products_order_by!], $priceLte: float8, $priceGte: float8, $brand_id: Int, $color: String, $limit: Int, $offset: Int) {
  products_aggregate(where: {id: {_eq: $id}, product_locales: {name: {_ilike: $name}}, categories_products: {category: {slug: {_eq: $slug}}}, _and: [{price: {_lte: $priceLte}}, {price: {_gte: $priceGte}}], product_colors: {color: {slug: {_eq: $color}}}, brand_id: {_eq: $brand_id}}) {
    aggregate {
      count
    }
  }
  products(order_by: $order_by, limit: $limit, offset: $offset, where: {id: {_eq: $id}, product_locales: {name: {_ilike: $name}}, categories_products: {category: {slug: {_eq: $slug}}}, _and: [{price: {_lte: $priceLte}}, {price: {_gte: $priceGte}}], product_colors: {color: {slug: {_eq: $color}}}, brand_id: {_eq: $brand_id}}) {
    id
    rest
    charge
    article
    product_locales(where: {locales_id: {_eq: $locales_id}}) {
      name
      description
    }
    favorites(where: {user_id: {_eq: $user_id}, product_id: {_eq: $id}}, limit: 1) {
      product_id
    }
    product_images {
      id
      alt
      name
      image
      is_main
    }
    product_colors(where: {color: {slug: {_eq: $color}}}) {
      color {
        code
        slug
        id
        color_locales {
          name
        }
      }
    }
    price
    old_price
    rating
    categories_products {
      category_id
      category {
        id
        slug
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
        category_locales {
          name
        }
      }
    }
  }
}


`;

queries.CATEGORIES_WITH_PRODUCTS = `
query ($product_id: Int, $user_id: uuid, $locales_id: Int, $categories: [Int!],$limit:Int) {
  categories(where: {id: {_in: $categories}}) {
    id
    slug
    category_locales(where: {locales_id: {_eq: $locales_id}}) {
      name
    }
    categories_products(limit:$limit where: {category_id: {_in: $categories}}) {
      product {
        id
        rest
        charge
        article
        favorites(where: {user_id: {_eq: $user_id}, product_id: {_eq: $product_id}}, limit: 1) {
          product_id
        }
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
        discount
        brand {
          id
          name
        }
        categories_products {
          category {
            id
            slug
            category_locales(where: {locales_id: {_eq: $locales_id}}) {
              name
            }
          }
        }
      }
    }
  }
}


`;

queries.CATEGORIES_ON_INDEX = `
query ($product_id: Int, $user_id: uuid, $locales_id: Int, $categories: [Int!], $limit: Int) {
  categories(where: {id: {_in: $categories}}) {
    id
    slug
    category_locales(where: {locales_id: {_eq: $locales_id}}) {
      name
    }
    categories_products(limit: $limit, where: {category_id: {_in: $categories}}, order_by: {product_id: desc}) {
      product {
        id
        rest
        charge
        article
        favorites(where: {user_id: {_eq: $user_id}, product_id: {_eq: $product_id}}, limit: 1) {
          product_id
        }
        product_locales(where: {locales_id: {_eq: $locales_id}}) {
          name
          description
        }
        product_colors(order_by: {}) {
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
        discount
        brand {
          id
          name
        }
        categories_products {
          category {
            id
            slug
            category_locales(where: {locales_id: {_eq: $locales_id}}) {
              name
            }
          }
        }
      }
    }
  }
}



`;

queries.ADD_FAVORITE = `
mutation($user_id:uuid,$product_id:Int,$locales_id:Int){
insert_favorites(objects:{user_id:$user_id, product_id:$product_id}){
    affected_rows
  }
}
`;
queries.DELETE_FAVORITE = `
mutation($user_id:uuid,$product_id:Int,$locales_id:Int){
 delete_favorites(where:{user_id:{_eq:$user_id}, product_id:{_eq:$product_id}}){
    affected_rows
  }
}
`;

queries.FAV_SUBSCRIPTION = `
subscription ($user_id: uuid,$locales_id:Int) {
  favorites_aggregate(where: {user_id: {_eq: $user_id}}) {
    nodes{
      product{
        product_locales(where:{locales_id:{_eq:$locales_id}}){
          name
        }
      }
    }
    aggregate {
      count
    }
  }
}

`;



export default queries;
