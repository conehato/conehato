import { Header } from "@/components/header";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { categoryId?: string };
}) {
  return (
    <main className="flex flex-col min-h-full">
      <Header categoryId={params?.categoryId} toWrite />
      {children}
    </main>
  );
}
