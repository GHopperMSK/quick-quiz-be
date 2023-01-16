const Pool = require('pg').Pool
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})
db.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

module.exports = db;