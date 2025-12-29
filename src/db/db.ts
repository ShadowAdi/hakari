import { Pool } from "pg";

const ConnectionString = process.env.ConnectionString
export let pool: Pool
export const initDB = () => {
    pool = new Pool({
        connectionString: ConnectionString
    })
}