

const queries = {}

queries.TRANSACTIONS = `
query ($order_id: Int, $paycom_transaction_id:String, $locales_id: Int) {
  transactions(where: {order_id: {_eq: $order_id},paycom_transaction_id: {_eq: $paycom_transaction_id}}) {
    id
    order_id
    amount
    reason
    receivers
    cancel_time
    create_time
    paycom_time
    perform_time
    paycom_transaction_id
    paycom_time_datetime
    state
  }
}`

queries.INSERT_TRANSACTION = `
mutation ($paycom_transaction_id: String!, $order_id: Int!, $amount: Int!, $state: smallint!, $locales_id: Int) {
  insert_transactions(objects: {paycom_transaction_id: $paycom_transaction_id, state: $state, amount: $amount, order_id: $order_id}) {
    returning {
      create_time
      id
      paycom_transaction_id
      state
      receivers
    }
  }
}`

queries.CANCEL_TRANSACTION = `
mutation cancel($reason: smallint!, $id: Int!, $state: smallint!, $locales_id: Int) {
  update_transactions(where: {id: {_eq: $id}}, _set: {reason: $reason, state: $state,cancel_time:"now()"}) {
    returning {
      id
    order_id
    amount
    reason
    receivers
    cancel_time
    create_time
    paycom_time
    perform_time
    paycom_transaction_id
    paycom_time_datetime
    state
    }
  }
}
`

queries.UPDATE_TRANSACTON = `
mutation complete($id: Int!, $state: smallint!, $locales_id: Int) {
  update_transactions(where: {id: {_eq: $id}}, _set: {perform_time: "now()", state: $state}) {
    returning {
      id
    order_id
    amount
    reason
    receivers
    cancel_time
    create_time
    paycom_time
    perform_time
    paycom_transaction_id
    paycom_time_datetime
    state
    }
  }
}
`

queries.REPORT_TRANSACTION = `
query report($from: timestamptz, $to: timestamptz) {
  transactions(where: {state: {_gte: 0}, _and: [{paycom_time_datetime: {_gte: $from}}, {paycom_time_datetime: {_lte: $to}}]}) {
    id
    order_id
    amount
    reason
    receivers
    cancel_time
    create_time
    paycom_time
    perform_time
    paycom_transaction_id
    paycom_time_datetime
    state
  }
}

`
export default queries;
