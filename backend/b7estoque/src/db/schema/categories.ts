import { timeStamp } from "console";
import { pgTable, timestamp, text, uuid } from "drizzle-orm/pg-core";
import { TimePrecision } from "zod";

export const categories = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    deletedAt: timestamp('deleted_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export type Category = typeof categories.$inferSelect;
export type NewCagegory = typeof categories.$inferInsert;
