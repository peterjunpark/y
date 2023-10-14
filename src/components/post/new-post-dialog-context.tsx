"use client";

import React, { useState, createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { NewPostForm } from "./form";
import { UserAvatar } from "../user/avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Feather } from "lucide-react";

const NewPostDialogContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function NewPostDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <NewPostDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </NewPostDialogContext.Provider>
  );
}

export function useNewPostDialog() {
  const context = useContext(NewPostDialogContext);

  if (!context)
    throw new Error("useNewPostDialog must be used within a provider");
  return context;
}

type NewPostDialogProps = {
  image: string | null | undefined;
};
export function NewPostDialog({ image }: NewPostDialogProps) {
  const { data: session } = useSession(); // This component has to be a client component, so get image from client session.
  const { open, setOpen } = useNewPostDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-2 rounded-full text-lg xl:w-52">
          <span className="hidden xl:block">Post</span>
          <Feather className="block xl:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl pb-0">
        <Card className="flex items-start gap-3 rounded-none border-none p-2">
          <span className="hidden pt-2 sm:block">
            <UserAvatar image={image} />
          </span>
          <NewPostForm />
        </Card>
      </DialogContent>
    </Dialog>
  );
}
