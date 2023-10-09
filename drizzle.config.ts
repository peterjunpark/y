import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config(); // For drizzle studio

export default {
  schema: "./src/lib/schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    // connectionString: process.env.POSTGRES_URL!,
    connectionString: process.env.NEON_DATABASE_URL!,
  },
} satisfies Config;
