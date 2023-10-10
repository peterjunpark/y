import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { NewPostCard } from "./new-post-card";
import { Feather } from "lucide-react";

export function NewPostDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 rounded-full text-lg xl:w-52">
          <span className="hidden xl:block">Post</span>
          <Feather className="block xl:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl pb-0">
        <NewPostCard isDialog />
      </DialogContent>
    </Dialog>
  );
}
