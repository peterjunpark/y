"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const parseErrorMsg = (error: unknown) => {
  const err: { message: string; reason: unknown } = {
    message: "Unknown error",
    reason: "",
  };

  console.error(error);

  if (error instanceof Error) {
    err.message = error.message;
    err.reason = error.cause;
  } else if (error && typeof error === "object" && "message" in error) {
    err.message = String(error.message);
  } else if (typeof error === "string") {
    err.message = error;
  }

  if (typeof error === "object" && "constraint" in error!) {
    if (error.constraint === "user_handle_unique") {
      err.message = "Handle already taken!";
      err.reason = error.constraint;
    }
  }
  return err;
};

export const handleSubmit = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const handle = formData.get("handle") as string;

  try {
    await prisma.user.update({
      where: { id: id },
      data: { name: name, handle: handle },
    });
  } catch (err) {
    return parseErrorMsg(err);
  }

  redirect("/home");
};
