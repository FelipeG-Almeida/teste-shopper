import knex from 'knex';

export abstract class BaseDataBase {
	protected static connection = knex({
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: 'maquito78',
			database: 'shopper',
		},
		pool: {
			min: 0,
			max: 1,
			afterCreate: (conn: any, cb: any) => {
				conn.query(
					'SET SESSION sql_mode = "NO_AUTO_VALUE_ON_ZERO"',
					(err: any) => {
						cb(err, conn);
					}
				);
			},
		},
	});
}
