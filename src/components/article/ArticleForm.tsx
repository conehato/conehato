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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CategoryEntity } from "@/models";
import { Editor } from "../editor";

const formSchema = z.object({
  name: z.string(),
  password: z.string().optional(),
  title: z.string(),
  contents: z.string(),
  category: z.string(),
});

export type ArticleFormType = z.infer<typeof formSchema>;

interface ArticleFormProps {
  defaultValues: ArticleFormType;
  categories: CategoryEntity[];
  onSubmit: (values: ArticleFormType) => void;
}
export function ArticleForm({
  defaultValues,
  categories,
  onSubmit,
}: ArticleFormProps) {
  const form = useForm<ArticleFormType>({
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
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger ring={false} className="rounded-none">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-1">
                <FormControl>
                  <Input
                    className="rounded-none"
                    ring={false}
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-1">
                <FormControl>
                  <Input
                    className="rounded-none"
                    ring={false}
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

        <FormField
          control={form.control}
          name="title"
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

        <FormField
          control={form.control}
          name="contents"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormControl>
                <Editor value={value} onChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end p-2">
          <Button type="submit">提出</Button>
        </div>
      </form>
    </Form>
  );
}
