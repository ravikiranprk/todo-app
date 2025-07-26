import { pgTable, serial, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { enum: ["admin", "user"] }).default("user"),
    approved: boolean("approved").notNull().default(false),
    created_at: timestamp("created_at").notNull().defaultNow(),
});

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    completed: boolean("completed").default(false),
    user_id: integer("user_id").references(() => users.id),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
    todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
    user: one(users, {
        fields: [todos.user_id],
        references: [users.id],
    }),
}));


export type User = typeof users.$inferSelect;
export type Todo = typeof todos.$inferSelect;