import { capitalize } from "utils";
import { route as rt } from '@sveltech/routify'
export let route
export let icon;
export let count = 0
export let routes = []
$: if(rt){

} 
// if (typeof location != undefined && !route) {
// 	routes = location.pathname.split('/').filter(function (r) {
// 		return r
// 	})
// } else if (route) {
// 	routes = route.split('/').filter(function (r) {
// 		return r
// 	})
// }

count = routes.length - 1

function getRoute(index) {
	let url = '/'

	routes.map((rt, i) => {
		if (index >= i)
			url += rt
	})
	url = url.replace(/.\/$/, "");
	return url
}
