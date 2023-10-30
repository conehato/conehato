import { Header } from "@/components/header";

interface PostLayoutProps {
  children: React.ReactNode;
  params?: { category?: string };
}
export default function PostLayout({ children, params }: PostLayoutProps) {
  return (
    <main className="flex flex-col min-h-full">
      <Header categoryId={params?.category} />
      {children}
    </main>
  );
}
