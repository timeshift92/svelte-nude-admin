
import login from './login.js'
import product from './product'
import brand from './brand'
import category from './category'
import order from './order'
import color from "./colors";
import slider from "./slider";
import favorite from "./favorite";
import address from "./address";
import recent from "./recent";
import reviews from "./reviews";
import transaction from "./transaction";




export const queries = {};
Object.assign(queries, login, product, brand, category,order,color,slider,favorite,address,recent, reviews,transaction);
queries.ORDER_CHANGE_STATUS = `
mutation changeStatus($id: uuid, $status: smallint,$description:String,$operator_id:uuid) {
  update_orders(_set: {status: $status,description:$description,operator_id:$operator_id}, where: {id: {_eq: $id}}) {
    affected_rows
  }
} `;


queries.CHANGE_PASSWORD = `
mutation ($id:uuid, $password:String){
	update_user(where:{id:{_eq:$id}},_set:{password:$password}){
    affected_rows
  }
}`;

queries.REGISTER = `
mutation($email:String!, $password:String!) {
  auth_register(email: $email, password: $password)
}
`;

queries.ORDER_STAT = `
subscription{
	order_stats{
    completed
    failed
    new
    refferer
  }
}

`;

queries.ONLINE_OFFLINE = `
mutation ($id: uuid, $is_online:Boolean) {
  update_user(_set: {is_online: $is_online}, where: {id: {_eq:$id}}) {
    returning {
       id
        role
        email
        is_online
        agent_number
        group
    }
  }
}
`;

queries.GET_USERS_BY = `
query getUsers($user_id: uuid,$role:String, $group:Int, $is_online:Boolean) {
      user(where: {id: {_eq: $user_id},role: {_eq: $role}, group: {_eq: $group},is_online: {_eq: $is_online}}) {
        id
        role
        email
        is_online
        agent_number
        group
      }
    }
`;





queries.AGENT_NUMBER = `
query{
	agent_number(where:{name:{_nlike:"%senior%"},_not:{user_agent:{is_active:{_eq:true}}}}){
    number
    name
  }
}
`;
queries.SENIOR_AGENT_NUMBER = `
query{
	agent_number(where:{name:{_like:"%senior%"},_not:{user_agent:{is_active:{_eq:true}}}}){
    number
    name
  }
}
`;

queries.USER = `
query getUsers($perPage: Int, $page: Int, $user_role: String, $locales_id: Int) {
  user(limit: $perPage, offset: $page, where: {role: {_eq: $user_role}}) {
    id
    role
    email
    is_online
    locale {
      lang_code
      product_locales(where: {locales_id: {_eq: $locales_id}}) {
        name
      }
    }
  }
  user_aggregate {
    aggregate {
      count
    }
  }
}

`;

queries.USER_INSERT = `
mutation ($email:String!,$password:String!,$agent_number:smallint!, $role:String!,$group:Int){
  insert_user(objects:{email:$email,password:$password,agent_number:$agent_number,role:$role,group:$group}){
    returning{
       id
        role
        email
        is_online
      agent_number
      group
    }
  }
}
`;

queries.USER_UPDATE = `
mutation($id:uuid!,$email:String,$password:String,$agent_number:smallint, $role:String,$group:Int){
  update_user(where:{id:{_eq:$id}} _set:{email:$email,agent_number:$agent_number,role:$role,group:$group}){
    returning{
       id
        role
        email
        is_online
      agent_number
      group
    }
  }
}
`;

queries.USER_DELETE = `mutation($id: uuid) {
    delete_user(where: { id: { _eq: $id } }){
      returning{
        id
      }
    }
  }`,


  queries.SETTINGS = `
query getSETTINGS($key:String,$locales_id:Int){
  settings (where:{key:{_eq:$key}}){
    id
    key
    value
    type
  }
}
`;
queries.SETTINGS_INSERT = `
mutation ($key: String!, $value: String,$locales_id:Int) {
  insert_settings(objects: {key: $key , value: $value }){
    returning{
      id,
      key,
      value
      type
    }
  }
}
`;
queries.SETTINGS_UPDATE = `
mutation ($id:Int!,$key: String!, $value: String,$locales_id:Int) {
  update_settings(where: {id: {_eq: $id}}_set:{key:$key, value:$value}){
    returning{
    id,
    key,
    value
    type
    }
  }
}
`;

queries.SETTINGS_DELETE = `
mutation ($id: uuid!,$locales_id:Int) {
  delete_settings(where: {id: {_eq: $id}}){
    returning{
      id
    }
  }
}
`;
queries.SETTINGS_GET_BY_KEY = `
query getConfig($key: String) {
  SETTINGS(where: {key: {_eq: $key}}) {
    id,
    key,
    value
  }
}
`;
