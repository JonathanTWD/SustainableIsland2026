import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

pool.on("error", (error: Error) => {
    console.error("Unexpected PostgreSQL pool error", error);
});

export async function checkDatabaseConnection() {
    const result = await pool.query("SELECT NOW() AS now");
    return result.rows[0];
}