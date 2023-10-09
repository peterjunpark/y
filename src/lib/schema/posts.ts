import {
  timestamp,
  serial,
  pgTable,
  text,
  index,
  integer,
  varchar,
  foreignKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const posts = pgTable(
  "post",
  {
    id: serial("id").notNull().primaryKey(),
    content: varchar("content", { length: 200 }).notNull(),
    likes: integer("likes").notNull().default(0),
    parentId: integer("parentId"), // If a post has a parent, it's a reply.
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
    userId: text("userId")
      .notNull()
      .references(() => users.id),
  },
  (table) => {
    return {
      userIdIdx: index("userIdIdx").on(table.userId),
      parentReference: foreignKey({
        columns: [table.id],
        foreignColumns: [table.parentId],
      }),
    };
  },
);

export type Post = InferSelectModel<typeof posts>;
export type NewPost = Omit<
  InferInsertModel<typeof posts>,
  "createdAt" | "likes"
>;
