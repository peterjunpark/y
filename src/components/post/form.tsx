"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { handleSubmit } from "./form-action";
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

export function NewPostForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = (values: FormSchema) => {
    const formData = new FormData();
    formData.append("content", values.content.trim());
    alert("posted!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="What's going on? ..."
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              {form.getValues("content") && (
                <div className="flex justify-between p-1">
                  <span>
                    <FormMessage />
                  </span>
                  <Button type="submit" className="rounded-full">
                    Post
                  </Button>
                </div>
              )}
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
}
