import {
  sqliteTable,
  integer,
  text,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

export const tasks = sqliteTable("tasks", {
  id: integer().primaryKey(),
  task: text().notNull(),
  project_id: integer()
    .references(() => projects.id)
    .notNull(),
  task_id: integer().references((): AnySQLiteColumn => tasks.id),
});
