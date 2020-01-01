

const address = {}

address.ADDRESS =  `
query ($user_id: uuid, $locales_id: Int) {
  address(where: {user_id: {_eq: $user_id}}) {
    name
    fullname
    phone
  }
}
`
address.ADDRESS_INSERT =  `
mutation ($user_id: uuid, $locales_id: Int, $name: String, $fullname: String, $phone: String) {
  insert_address(objects: {user_id: $user_id, name: $name, fullname: $fullname, phone: $phone}, on_conflict: {constraint: address_pkey, update_columns: [name, fullname, phone]}) {
    returning {
      name
      fullname
      phone
    }
  }
}

`


export default address;
