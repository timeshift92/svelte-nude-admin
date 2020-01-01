import { GraphQL } from "graphql-svelte";
import { graphqlFetchOptions, hashObject, SubscribeQL } from "graphql-svelte";
import { writable ,readable,derived} from 'svelte/store'
import { queries } from '~/queries/index'
const graphql = new GraphQL();

const fetchOptionsOverride = options => {
  (options.url = "http://localhost:8082/v1/graphql"),
    (options.headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret": "tscorp",
      "Accept-Encoding": "gzip"
    });
};

let subscribe = (query) => {
  return writable({ id: 1 })
}

// if (process.browser) {
  let sub = new SubscribeQL('ws://localhost:8082/v1/graphql', {
    reconnect: true,
    // reconnectionAttempts:3,
    // timeout: 1000,
    lazy: true,
    connectionParams: async () => {
      return {
        headers: {
          "x-hasura-admin-secret": "tscorp"
        }
      };
    }
  })

  subscribe = (query) => {
    return sub.request(query);
  }
// }

//if you nedd query and mutate

  async function get(query, variables){
  query = queries[query];
  const fetchOptions = graphqlFetchOptions({
    query,
    variables
  });
  fetchOptionsOverride(fetchOptions)
  const has = hashObject(fetchOptions);
  if (graphql.cache[has]){
    return writable(graphql.cache[has])
  }

  const pending = graphql.operate({
    fetchOptionsOverride,
    operation: {
      query,
      variables
    }
  });
  return pending.cacheValuePromise
}

let query =  (query, variables) => {

  query = queries[query];
  const fetchOptions = graphqlFetchOptions({
    query,
    variables
  });
  fetchOptionsOverride(fetchOptions)
  const has = hashObject(fetchOptions);
  if (graphql.cache[has]){
    // return readable(graphql.cache[has], function start(set) {
    //   const interval = setInterval(() => {
    //     set(graphql.cache[has]);
    //   }, 1000);

    //   return function stop() {
    //     clearInterval(interval);
    //   };
    // });
  }

  const pending = graphql.operate({
    fetchOptionsOverride,
    operation: {
      query,
      variables
    }
  });
  return writable(pending.cacheValuePromise);
  // return derived(
  //   dt,
  //   $dt => dt
  // );
  // return pending.cacheValuePromise[Symbol_observable] = () => {
  //   return {
  //     subscribe(observer) {
  //       const handler = e => observer.next(e);
  //       someObject.addEventListener('data', handler);
  //       return {
  //         unsubscribe() {
  //           someObject.removeEventListener('data', handler);
  //         }
  //       }
  //     },
  //     [Symbol_observable]() { return this }
  //   }
  // }
  // return readable(pending.cacheValuePromise, function start(set) {
  //   const interval = setInterval(() => {
  //     set(pending.cacheValuePromise);
  //   }, 1000);

  //   return function stop() {
  //     clearInterval(interval);
  //   };
  // });
}

 export function restore(query, data) {

  if(data){
    const fetchOptions = graphqlFetchOptions({
      query:queries[query]
    });
    fetchOptionsOverride(fetchOptions)
    const has = hashObject(fetchOptions);

    if (graphql.cache[has])
      {
        graphql.cache[has] = data
      }

  }

}

export { get, get as mutate, query, subscribe };
