import { Header } from "@/components/header";
import { parseParamsCategoryId } from "@/normalizing";

export default function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { categoryId?: string };
}) {
  const { categoryId, group } = parseParamsCategoryId(params?.categoryId);

  return (
    <main className="flex flex-col min-h-full">
      <Header group={group} categoryId={categoryId} />
      {children}
    </main>
  );
}
