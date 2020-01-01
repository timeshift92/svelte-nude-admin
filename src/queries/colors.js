

const colors = {}

colors.COLORS = `
  query getColors($locales_id: Int,$limit: Int, $offset: Int) {

  colors(limit: $limit, offset: $offset) {
    __typename
    code
    slug
    id
    color_locales(where: {locales_id: {_eq: $locales_id}}) {
      name
    }
  }
}

`;

colors.COLORS_INSERT = `
mutation ($slug: String, $code: String, $name: String, $locales_id: Int) {
  insert_colors(objects: {code: $code, slug: $slug, color_locales: {data: {name: $name, locales_id: $locales_id}}}) {
    returning {
      id
      code
      slug
      color_locales {
        name
      }
    }
  }
}
`;

colors.COLORS_UPDATE = `
mutation ($slug: String, $code: String, $name: String, $locales_id: Int, $id: Int) {
  update_color_locales(_set: {name: $name}, where: {color_id: {_eq: $id}, locales_id: {_eq: $locales_id}}) {
    affected_rows
  }
  update_colors(_set: {code: $code, slug: $slug}, where: {id: {_eq: $id}}) {
    returning {
      id
      code
      slug
      color_locales {
        name
      }
    }
  }
}

`;

colors.COLORS_DELETE = `
mutation ($id: Int) {
  delete_colors(where: {id: {_eq: $id}}) {
    affected_rows
  }
}

`;


export default colors;
