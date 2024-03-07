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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string(),
  password: z.string().optional(),
  contents: z.string(),
  articleId: z.string(),
  categoryId: z.string(),
  parentId: z.string().optional(),
});

export type CommentFormType = z.infer<typeof formSchema>;

export interface CommentFormProps {
  onSubmit: (values: CommentFormType & { articleId: string }) => void;
  defaultValues: CommentFormType;
  dismissCommentForm: () => void
}
export function CommentForm({ defaultValues, onSubmit, dismissCommentForm }: CommentFormProps) {
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
        className="space-y-2 border-slate-400 px-3 py-2 bg-slate-100"
      >
        <div>{defaultValues.parentId ? "リプ作成" : "コメント作成"}</div>
        <div className="flex gap-2">
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
                <Textarea className="h-10" placeholder="contents" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end p-2 gap-2">
          {defaultValues.parentId && <Button type="button" variant="outline" className="text-slate-500" onClick={() => dismissCommentForm()}>취소</Button>}
          <Button type="submit">提出</Button>
        </div>
      </form>
    </Form>
  );
}
