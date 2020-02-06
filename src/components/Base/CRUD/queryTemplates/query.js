import { hasura } from 'api';


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
	return query;
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

export function updateAdapter(schema, variables, columns, id) {
	const type = 'update'
	const returning = mutationFieldsAdapter(hasura('returning'), columns)
	let query = hasura(schema)[type]({ id }).where({ id }).select(`${returning._fields} ${returning._with}`)
	.select(' id ')


	for (const variable in variables) {
		if (Array.isArray(variables[variable]) && variables[variable].length > 1) {
			query.compose(variable, (deleting => {
				return deleting.delete({ [`${clearManyType(schema)}_id`]: id })
			}))
			query.compose(variable, (qr => {
				return qr.insert(variables[variable].flatMap(v => ({ ...v, [`${clearManyType(schema)}_id`]: id })))
			}))
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
			query.with(variable, (qr => {
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
