const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'cookin_culture',
	user: 'matthewkim'
})


module.exports = db;
