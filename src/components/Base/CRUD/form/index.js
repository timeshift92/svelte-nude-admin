import Field from "./Field.svelte";
import Dropdown from "./Dropdown.svelte";
import Dropdown2 from "./Dropdown2.svelte";
import Image from "./Image.svelte";
import Input from "./Input.svelte";
import Numb from "./Number.svelte";


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
Field['dropdown2'] = Dropdown2;
Field['image'] = Image;
Field['input'] = Input;
Field['text'] = Input;
Field['number'] = Numb;
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
export {
  Field,
  Dropdown,
  Dropdown2,
  Image
}

export default Field