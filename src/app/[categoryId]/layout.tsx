import { Header } from "@/components/header";

interface CategoryLayoutProps {
  children: React.ReactNode;
  params?: { categoryId?: string };
  toWrite?: boolean;
}
export default function CategoryLayout({
  children,
  params,
  toWrite = true,
}: CategoryLayoutProps) {
  return (
    <main className="flex flex-col min-h-full">
      <Header categoryId={params?.categoryId} toWrite={toWrite} />
      {children}
    </main>
  );
}
