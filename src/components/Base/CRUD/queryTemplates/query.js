import orm from 'hasura-orm';




export function columnsAdapter(schema, columns , callback = (field, relation) => relation) {
	const query = new orm(schema)
	columns.map(column => {
		if (column.fields) {
			query.with(column.name, (qry) => {
				return callback(column.name,qry.select(column.fields.join(',')));
			})
		} else {
			query.select(column.name)
		}
	})

	return query;
}


