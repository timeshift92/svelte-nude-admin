import Field from 'crud/form';
export const objectWithoutKey = (object, key) => {
	const { [key]: deletedKey, ...otherKeys } = object
	return otherKeys
}

export const objectWithoutKeys = (object, keys) => {
	for (let i = 0; i < keys.length; i++) {
		object = objectWithoutKey(object, keys[i])
	}
	return object
}

export const getComponent = (type) => {
	return typeof type == 'string' ? Field[type] : type
}

export const hasComplexType = type => {
	return ['fieldset', 'tabs'].includes(type)
}

