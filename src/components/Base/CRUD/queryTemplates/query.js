import { hasura } from 'api';


export function columnsAdapter(schema, columns, callback = (field, relation) => relation) {
	const query = hasura(schema)
	columns.map(column => {
		if (column.fields) {
			query.with(column.name, (qry) => {
				return callback(column.name, qry.select(column.fields.join(',')));
			})
		} else {
			query.select(column.name)
		}
	})

	return query;
}

