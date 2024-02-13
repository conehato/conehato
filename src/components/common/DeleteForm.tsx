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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  articleId: z.string(),
  commentId: z.string().optional(),
  password: z.string(),
});

export type DeleteFormType = z.infer<typeof formSchema>;

interface DeleteFormProps {
  defaultValues: DeleteFormType;
  onSubmit: (values: DeleteFormType) => Promise<string | undefined>;
}
export function DeleteForm({ defaultValues, onSubmit }: DeleteFormProps) {
  const { toast } = useToast();

  const form = useForm<DeleteFormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="rounded-md px-1 text-sm text-slate-500 cursor-pointer">
            削除
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const error = await onSubmit(values);
                error && toast({ description: error, variant: "destructive" });
                form.reset();
              })}
            >
              <DialogHeader>
                <DialogTitle>削除</DialogTitle>
                <DialogDescription>
                  パスワードを入力してください。
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
                  <Button type="submit">削除</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
