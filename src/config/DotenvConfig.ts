import { configDotenv } from "dotenv";

configDotenv()

export const PORT=process.env.PORT
export const CLIENT_URL=process.env.CLIENT_URL
export const DATABASE_URL=process.env.DATABASE_URL