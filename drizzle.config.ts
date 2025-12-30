import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from "./src/config/DotenvConfig.js";

export default defineConfig({
  out: './drizzle',
  schema: './src/schema/',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL!,
  },
});
