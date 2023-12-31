"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSubmit } from "./form-action";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Logo } from "../logo";
import { UserAvatar } from "../user/avatar";

type SignupFormProps = {
  defaultName: string;
  image: string;
  userId: string;
};

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Username is required." })
    .max(12, { message: "Must be fewer than 12 characters." }),
  handle: z
    .string()
    .min(3, { message: "Must be at least 3 characters." })
    .max(12, { message: "Must be fewer than 12 characters." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Must not include spaces or special characters.",
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export function SignupForm({ defaultName, image, userId }: SignupFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
      handle: "",
    },
  });
  const { toast } = useToast();

  const onSubmit = async (values: FormSchema) => {
    const formData = new FormData();
    formData.append("handle", values.handle.trim());
    formData.append("id", userId);
    if (values.name !== defaultName) {
      formData.append("name", values.name.trim());
    }

    // Server action
    const error = await handleSubmit(formData);

    // Case where handle is already taken.
    if (error && error.code === "P2002") {
      toast({
        variant: "destructive",
        title: error.message,
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  className="w-[10.87rem]"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handle</FormLabel>
              <div className="flex items-center gap-2">
                <span className="text-xl">@</span>
                <FormControl>
                  <Input placeholder="Handle" {...field} className="w-[9rem]" />
                </FormControl>
              </div>
              <FormDescription>
                How people will find you on <Logo className="text-lg" />.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {image && <UserAvatar image={image} />}
          <Button type="submit" className="rounded-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
