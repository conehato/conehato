"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  articleId: z.string(),
  password: z.string(),
});

export type ArticleDeleteFormType = z.infer<typeof formSchema>;

interface ArticleDeleteFormProps {
  defaultValues: ArticleDeleteFormType;
  onSubmit: (values: ArticleDeleteFormType) => void;
}
export function ArticleDeleteForm({
  defaultValues,
  onSubmit,
}: ArticleDeleteFormProps) {
  const form = useForm<ArticleDeleteFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">삭제</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              onSubmit(values);
              form.reset();
            })}
          >
            <DialogHeader>
              <DialogTitle>글 삭제</DialogTitle>
              <DialogDescription>
                글을 작성 하실때 입력하신 비밀번호를 입력하세요.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-none"
                      ring={false}
                      placeholder="title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="submit">삭제</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
