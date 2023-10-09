import { primaryKey, pgTable, text, index, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { posts } from "./posts";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const likes = pgTable(
  "like",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    postId: integer("postId")
      .notNull()
      .references(() => posts.id),
  },
  (table) => {
    return {
      postIdIdx: index("postIdIdx").on(table.postId),
      pk: primaryKey(table.userId, table.postId),
    };
  },
);

export type Like = InferSelectModel<typeof likes>;
export type NewLike = InferInsertModel<typeof likes>;
