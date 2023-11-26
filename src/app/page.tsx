import { ArticleList } from "@/components/article";

import CategoryLayout from "./[categoryId]/layout";

interface HomePageProps {
  searchParams: { page?: number; hot?: boolean };
}
export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <CategoryLayout>
      <ArticleList
        page={Number(searchParams.page || 1)}
        isHot={Boolean(searchParams.hot || false)}
      />
    </CategoryLayout>
  );
}
