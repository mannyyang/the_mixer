const path = require('path');
const pgp = require('pg-promise')();

const db = pgp({
	host: 'localhost',
	port: 5432,
	database: 'cookin_culture',
	user: 'matthewkim',
	password: 'pw'
});

// Helper for linking to external query files:
function sql(file) {
	const fullPath = path.join(__dirname, file);
	return new pgp.QueryFile(fullPath, { minify: true });
}

// Execute all statements found in schema.sql
const sqlStatements = sql('./schema.sql');
db.query(sqlStatements)
	.catch(error => {
		throw error;
	});

module.exports = db;
