import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema/users";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const result = await db.select().from(users);
  // ^?

  return NextResponse.json(result);
}
