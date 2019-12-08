	import { capitalize } from "utils";
	export let route
  export let icon;
  export let count = 0
  export let routes = []
  if (route) {
    routes = route.split('/').filter(function(r) {
      return r
    })
  }
  count = routes.length - 1

  function getRoute(index) {
    let url = '/'
    routes.map((rt, i) => {
      url += index == i ? rt : rt + '/'
    })
    return url
  }
