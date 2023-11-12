"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CategoryEntity } from "@/models";

const formSchema = z.object({
  name: z.string(),
  password: z.string().optional(),
  contents: z.string(),
  articleId: z.string(),
  categoryId: z.string(),
});

export type CommentFormType = z.infer<typeof formSchema>;

interface CommentFormProps {
  onSubmit: (values: CommentFormType & { articleId: string }) => void;
  defaultValues: CommentFormType;
}
export function CommentForm({ defaultValues, onSubmit }: CommentFormProps) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values);
          form.reset();
        })}
        className="space-y-1 m-3 border-2 border-slate-400"
      >
        <div className="flex gap-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="contents" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">提出</Button>
      </form>
    </Form>
  );
}
