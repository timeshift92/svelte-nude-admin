import Field from "./Field.svelte";
import FieldSet from "./FieldSet.svelte";
import Tabs from "./Tabs.svelte";
import Dropdown from "./Dropdown.svelte";
import Image from "./Image.svelte";
import Input from "./Input.svelte";
import Form from './Form.svelte';


function configure(configuration) {
	if (Input.render) {
		// It's an SSR'd component. We need to wrap .render
		return {
			...Input,
			render(props) {
				return Input.render({
					...props,
					[Symbol.for('configuration')]: configuration
				})
			}
		};
	} else {
		// It's a client side component. We need to extend the class.
		return class ConfiguredInput extends Input {
			constructor(options) {
				const props = options.props || {};
				super({
					...options,
					props: {
						...props,
						[Symbol.for('configuration')]: configuration
					}
				});
			}
		};
	}
};

Field['dropdown'] = Dropdown;
Field['image'] = Image;
Field['input'] = Input;
Field['text'] = Input;
Field['number'] = new configure({
	props: {
		type: 'number'
	}
})
Field['password'] = new configure({
	props: {
		type: 'password'
	}
})
Field['email'] = new configure({
	props: {
		type: 'email'
	}
})
Field['hidden'] = new configure({
	props: {
		type: 'hidden'
	}
})

Form['Field'] = Field
Form['FieldSet'] = FieldSet
Form['Tabs'] = Tabs
Form['field'] = Field
Form['fieldset'] = FieldSet
Form['tabs'] = Tabs

export {
	Field,
	Dropdown,
	Image,
	Form
}

export default Field
