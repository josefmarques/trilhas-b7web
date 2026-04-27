import { integer, text, timestamp, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
import { v4 } from "uuid";

const timestamps = {
    createAt: timestamp().defaultNow().notNull(),
    updateAt: timestamp()
}

export const rolesEnum = pgEnum('roles', ['user', 'admin']);

export const usersTable = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    role: rolesEnum().default('user'),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    obs: varchar({ length: 255 }),
    balance: integer().default(100),
    ...timestamps

});

export const petsTable = pgTable('pets', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    ownerId: integer().notNull().references(() => usersTable.id),
    ...timestamps
});

export const postsTable = pgTable('posts', {
    id: varchar({ length: 100 }).primaryKey().$default(() => v4()),
    title: varchar({ length: 255 }).notNull(),
    body: text(),
    ownerId: integer().notNull().references(() => usersTable.id)
});