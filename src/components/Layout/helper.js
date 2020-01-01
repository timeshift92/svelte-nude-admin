import { expanded } from './store.js'
export function change(state) {
	expanded.update(c => {
		if (!c) {
			document.querySelector('nu-menu[nu-id="sidebar"]').setAttribute('nu-pressed', true)
			document.querySelector('nu-block[nu-id="cover"]').setAttribute('nu-pressed', true)
		} else {
			document.querySelector('nu-menu[nu-id="sidebar"]').removeAttribute('nu-pressed')
			document.querySelector('nu-block[nu-id="cover"]').removeAttribute('nu-pressed')
		}

		return !c

	})
}

export function fistChar(str) {
	var matches = str.match(/\b(\w)/g);
	var acronym = matches.join("");
	return acronym.toUpperCase();
}
export function addRemovePressedAttribute(elem) {
	elem.getAttribute("nu-pressed") != null
		? elem.removeAttribute("nu-pressed")
		: elem.setAttribute("nu-pressed", "");
}

export function go(url) {
	if (document.body.clientWidth < 960) {
		change()
	}
	window.history.pushState('popstate', 'tt', url)
}
