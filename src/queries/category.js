

const queries = {}

queries.CATEGORIES = `
query getCategories($locales_id: Int,$parent_id:Int,$limit: Int, $offset: Int) {
  categories(limit: $limit, offset: $offset,where: {_or:[{parent_id: {_is_null: true}},{parent_id: {_eq: $parent_id}}] }) {
    __typename
    id
    parent_id
    slug
    children {
      id
      parent_id
      slug
      category_locales(where: {locales_id: {_eq: $locales_id}}) {
        name
      }
      children {
        id
        parent_id
        slug
        category_locales(where: {locales_id: {_eq: $locales_id}}) {
          name
        }
        children {
          id
          parent_id
          slug
          category_locales(where: {locales_id: {_eq: $locales_id}}) {
            name
          }
        }
      }
    }
    category_locales(where: {locales_id: {_eq: $locales_id}}) {
      name
    }
  }
}
`;

queries.CATEGORIES_INSERT = `
mutation ($name: String!, $slug: String!, $locales_id: Int!, $parent_id:Int) {
  insert_categories(objects: {parent_id:$parent_id, slug: $slug, category_locales: {data: {name: $name, locales_id: $locales_id}}}) {
    returning {
      id
      category_locales {
        name
      }
    }
  }
}


`;

queries.CATEGORIES_UPDATE = `
mutation ($name: String!, $slug: String!, $id: Int, $locales_id: Int!, $parent_id: Int) {
  update_category_locales(_set: {name: $name}, where: {locales_id: {_eq: $locales_id}, category_id: {_eq: $id}}) {
    affected_rows
  }
  update_categories(_set: {slug: $slug, parent_id: $parent_id}, where: {id: {_eq: $id}}) {
    returning {
      id
      slug
      category_locales {
        name
      }
    }
  }
}


`;

queries.CATEGORIES_DELETE = `
mutation ($id: Int, $locales_id:Int  ) {
  delete_categories(where: {id: {_eq: $id}}) {
    returning {
      id
    }
  }
}

`;



export default queries;
