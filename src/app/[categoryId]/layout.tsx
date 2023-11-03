import { Header } from "@/components/header";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { categoryId?: string };
}) {
  return (
    <main className="flex flex-col min-h-full gap-4">
      <Header categoryId={params?.categoryId} />
      {children}
    </main>
  );
}
