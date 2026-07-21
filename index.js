const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('users.db');
// Create a table (only runs once effectively – "IF NOT EXISTS" prevent error on re-run)
db.exec(`
	CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	age INTEGER NOT NULL
	)
`);

console.log("Database and table ready");
