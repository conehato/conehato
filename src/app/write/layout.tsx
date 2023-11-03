import { Header } from "@/components/header";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-full gap-4">
      <Header hideNavigationMenu />
      {children}
    </main>
  );
}
