import CategoryLayout from "./[categoryId]/layout";
import { ArticleList } from "@/components/article";

interface HomePageProps {
  searchParams: { page?: number; hot?: boolean };
}
export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <CategoryLayout toWrite={false}>
      <ArticleList
        page={Number(searchParams.page || 1)}
        isHot={Boolean(searchParams.hot || false)}
      />
    </CategoryLayout>
  );
}
