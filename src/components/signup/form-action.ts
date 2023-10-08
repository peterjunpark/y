"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema/users";

const parseErrorMsg = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error";
  }
  return message;
};

export const handleSubmit = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const handle = formData.get("handle") as string;
  try {
    const result = await db
      .update(users)
      .set({ handle: handle })
      .where(eq(users.id, id));

    if (result) redirect("/home");
  } catch (err) {
    console.error(err);
    return { error: parseErrorMsg(err) };
  }
};
