import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parsePrismaError = (error: unknown) => {
  let message = "Unknown error occurred.";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Handle already taken!";
    }
    return { message, code: error.code, target: error.meta!.target };
  }

  return {
    message,
    code: "Unknown Prisma error code",
    target: "Unknown Prisma error target",
  };
};
