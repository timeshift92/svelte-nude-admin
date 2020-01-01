

const loginqueries = {}

loginqueries.AUTH_LOGIN = `
mutation ($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      accessToken
      userId
    }
  }

`;

loginqueries.AUTH_ME = `
query ($id: uuid, $locales_id: Int) {
  user(where: {id: {_eq: $id}}) {
    id
    email
    locales_id
    role
    locale  {
      product_locales(where:{locales_id:{_eq:$locales_id} })	{
        name
      }
      lang_code
    }
  }
}

`;

loginqueries.AUTH_REGISTER = `
mutation ($email: String!, $password: String!) {
    auth_register(email: $email, password: $password)
  }

`;

export default loginqueries;
