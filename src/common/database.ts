import PG from 'pg';

const Pool = PG.Pool;
export const database = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
})
database.on('error', (err: Error, client: any) => {
    console.error('idle client error', err.message, err.stack);
});