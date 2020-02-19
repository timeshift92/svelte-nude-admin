import { hasura } from 'api';
import { objectWithoutKey } from './formHelper'

export function columnsAdapter(schema, columns, callback = (field, relation) => relation, _query = null) {
	const query = _query || hasura(schema)
	columns.map(column => {
		if (column.fields) {
			query.with(column.name, (qry) => {
				return callback ? callback(column.name, qry.select(column.fields.join(','))) : qry.select(column.fields.join(','));
			})
		} else {
			query.select(column.name)
		}
	})
	return query.orderBy({ id: 'asc' });
}

export function mutationFieldsAdapter(query, columns) {
	columns.map(column => {
		if (['fieldset', 'tabs'].includes(column.type)) {
			if (column.name) {
				query.with(column.name, (qry) => {
					return qry.select(column.fields.flatMap(column => column.name).join(','));
				})
			} else {
				mutationFieldsAdapter(query, column['fields'])
			}
		}
		else if (column.fields) {
			query.with(column.name, (qry) => {
				return qry.select(column.fields.join(','));
			})
		}
		else if (column.type == 'dropdown' && column.data.foreign_key) {
			query.with(column.name, (qry) => {
				return qry.select(column.data.foreign_key);
			})
		}
		else {
			query.select(column.name)
		}
	})

	return query

}

function clearManyType(name) {

	if (['s', 'ss', 'x', 'sh', 'ch', 'о'].includes(name[name.length - 1])) {
		return name.substr(0, name.length - 1)
	} else if (name.substr(name.length - 3, name.length) == 'ies') {
		return name.substr(0, name.length - 3) + 'y'
	} else {
		return name
	}


}

function getConditions(val) {
	let obj = {}

	let index = false;
	Object.keys(val).map(k => {
		if (k.indexOf('id') != -1) {
			index = k
		}
	})
	if (index != false) {
		obj[index] = val[index]
	}

	return obj
}

export function updateAdapter(schema, variables, columns, id) {
	const type = 'update'
	let query = hasura(schema)[type]({ id }).where({ id }).select('id')
	mutationFieldsAdapter(query, columns)
	for (const variable in variables) {
		if (Array.isArray(variables[variable]) && variables[variable].length > 0) {
			const deleteDatas = variables[variable].filter(item => item._delete);
			deleteDatas.map(deleteItem => {
				query.compose(variable, (deleting => {
					return deleting.delete({ id: deleteItem.id })
				}))
			})
			variables[variable] = variables[variable].filter(item => !item._delete);

			const insertDatas = variables[variable].filter(item => item._create);
			if (insertDatas.length > 0) {
				query.compose(variable, (qr => {
					return qr.insert(insertDatas.flatMap(v => ({ ...objectWithoutKey(v, '_create'), [`${clearManyType(schema)}_id`]: id })))
				}))
			}
			else {
				variables[variable].filter((item) => !item._create).map((it, i) => {
					query.compose(variable, (qr => {
						return qr.alias(`${variable}_${i}`).update(it)
							.where(Object.assign({ [`${clearManyType(schema)}_id`]: id }, getConditions(it)))
					}))
				})
			}

			delete variables[variable];

		}
	}
	if (Object.keys(variables).length > 0) {

		query[type](variables);
	}

	return query;
}

export function insertAdapter(schema, variables, columns) {
	const type = 'insert'
	let query = hasura(schema)
	for (const key in variables) {
		if (Array.isArray(variables[key])) {
			variables[key].flatMap(variable => {
				if (variable._create) {
					delete variable._create
				}
			})

		}
	}
	query = mutationFieldsAdapter(query, columns).select('id')
	if (Object.keys(variables).length > 0) {
		query = query[type](variables);
	}

	return query;
}
