// import { sql as _sql } from "@vercel/postgres";
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { sql } from "drizzle-orm";
// import { likes, type Like, type NewLike } from "../schema/likes";
// import { posts, type Post, type NewPost } from "../schema/posts";
// import { users, type User } from "../schema/users";

// export const db = drizzle(_sql);

// export const createPost = db
//   .insert(posts)
//   .values({
//     userId: sql.placeholder("userId"),
//     content: sql.placeholder("content"),
//     updatedAt: new Date(),
//   })
//   .prepare("createPost");

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle(sql);
