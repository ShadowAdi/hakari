import {
  pgTable,
  text,
  varchar,
  timestamp
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  name: text("name").notNull(),

  email: varchar("email", { length: 255 }).notNull(),

  password: varchar("password", { length: 255 }).notNull(),

  bio: varchar("bio", { length: 1000 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
