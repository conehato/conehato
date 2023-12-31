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
  commentId: z.string().optional(),
  password: z.string(),
});

export type DeleteFormType = z.infer<typeof formSchema>;

interface DeleteFormProps {
  defaultValues: DeleteFormType;
  onSubmit: (values: DeleteFormType) => void;
}
export function DeleteForm({ defaultValues, onSubmit }: DeleteFormProps) {
  const form = useForm<DeleteFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const target = defaultValues.commentId ? "댓글" : "글";

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-md px-1 text-sm text-slate-500">삭제</div>
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
                <DialogTitle>{target}삭제</DialogTitle>
                <DialogDescription>
                  {target}을 작성 하실때 입력하신 비밀번호를 입력하세요.
                </DialogDescription>
              </DialogHeader>

              <div className="flex py-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-1">
                      <FormControl>
                        <Input
                          placeholder="password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="submit">삭제</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
