import { hasura } from 'api';

import {objectWithoutKey} from '../utils'
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
		if (column.type == 'relation') {
			query.with(column.name, (qry) => {
				return qry.select(column.fields.flatMap(column => column.name).join(','));
			})
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
		if(index != false){
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
			// query.compose(variable, (deleting => {
			// 	return deleting.delete({ [`${clearManyType(schema)}_id`]: id })
			// }))
			const insertDatas = variables[variable].filter(item => item._create);
			if (insertDatas.length > 0) {
				query.compose(variable, (qr => {
					return qr.insert(insertDatas.flatMap(v => ({ ...objectWithoutKey(v,'_create'), [`${clearManyType(schema)}_id`]: id })))
				}))
			}
			else {
				variables[variable].filter((item) => !item._create).map((it, i) => {
					query.compose(variable, (qr => {
						return qr.alias(`${variable}_${i}`).update(it)
						.where(Object.assign({ [`${clearManyType(schema)}_id`]: id },getConditions(it)))
					}))
				})
			}

			delete variables[variable];

		} else if (Array.isArray(variables[variable]) && variables[variable].length < 2) {
			query.compose(variable, (qr => {
				return qr.update(variables[variable][0]).where({ [`${clearManyType(schema)}_id`]: id })
			}))
			delete variables[variable];
		}
	}
	if (Object.keys(variables) > 0) {
		query[type](variables);
	}

	return query;
}

export function mutationAdapter(schema, variables, columns, type = 'insert') {
	const query = hasura(schema)

	for (const variable in variables) {
		if (variables[variable].length > 1) {
			query.compose(variables, (deleting => {
				deleting.delete({ [clearManyType(schema)]: { _eq: variables.id } })
			}))
			debugger
			query.compose(variable, (qr => {
				qr.update()
			}))

		} else if (variables[variable].length < 2) {
			query.compose(variables, (deleting => {
				deleting.delete({ [clearManyType(schema)]: { _eq: variables.id } })
			}))
			query.with(variable, (qr => {
				qr.update()
			}))

			// update().where({ [clearManyType(schema)]})
		}
	}
	query[type](variables);
	mutationFieldsAdapter(query, columns)
	return query;
}
