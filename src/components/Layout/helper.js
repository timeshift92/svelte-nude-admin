import { expanded } from './store.js'
export function change(state) {
	expanded.update(c => {
		return !c
	})

}

export function fistChar(str) {
	var matches = str.match(/\b(\w)/g);
	var acronym = matches.join("");
	return acronym.toUpperCase();
}
export function addRememovePressedAttribute(elem) {
	elem.getAttribute("nu-pressed") != null
		? elem.removeAttribute("nu-pressed")
		: elem.setAttribute("nu-pressed", "");
}

export function go(url) {
	if(document.body.clientWidth < 960){
		change()
	}
	window.history.pushState('popstate', 'tt', url)
}
