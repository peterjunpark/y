"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSubmit } from "./form-action";
import { cn } from "@/lib/utils";
import { useNewPostDialog } from "./new-post-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Post body cannot be empty." })
    .max(200, { message: "Must be fewer than 200 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

type NewPostFormProps = {
  variant?: "compact";
  replyTo?: number;
  thread?: number;
};

export function NewPostForm({ variant, replyTo, thread }: NewPostFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { toast } = useToast();
  const { setOpen } = useNewPostDialog();

  const charCount = form.watch("content").length;

  const onSubmit = async (values: FormSchema) => {
    const formData = new FormData();
    formData.append("content", values.content.trim());
    if (replyTo) formData.append("replyTo", replyTo.toString());
    if (thread) formData.append("thread", thread.toString());

    const error = await handleSubmit(formData);

    if (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.message,
      });
    } else {
      toast({
        title: "Post created",
      });
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder={
                    replyTo ? "Reply to this post ..." : "What's going on? ..."
                  }
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              {(charCount > 0 || !variant) && (
                <div className="flex justify-between p-1">
                  <span>
                    <FormMessage />
                  </span>
                  <div className="ml-3 flex flex-col gap-2 xs:flex-row xs:gap-4">
                    <span
                      className={cn("text-sm text-muted-foreground", {
                        "text-destructive": charCount > 200,
                      })}
                    >
                      {charCount}/200
                    </span>
                    <Button
                      type="submit"
                      className="rounded-full"
                      disabled={form.formState.isSubmitting}
                    >
                      {replyTo ? "Reply" : "Post"}
                    </Button>
                  </div>
                </div>
              )}
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
}
