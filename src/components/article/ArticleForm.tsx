"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
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
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
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
                <FormLabel>password</FormLabel>
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>contents</FormLabel>
              <FormControl>
                <Input placeholder="contents" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
