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
		} else if (column.type == 'dropdown' && column.data.foreign_key) {
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

export function mutationAdapter(schema, variables, columns, type = 'insert') {
	const query = hasura(schema)[type](variables);
	mutationFieldsAdapter(query, columns)
	return query;
}
