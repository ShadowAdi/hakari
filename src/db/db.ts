import { neon, NeonQueryFunction } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const ConnectionString = process.env.ConnectionString
let sql: NeonQueryFunction<false, false>
let db: ReturnType<typeof drizzle>

export const connectDB = async () => {
    sql = neon(ConnectionString!)
    db=drizzle(sql)
}
