import { getCategoryById } from "@/services/category";

export default async function Post({
  params: { category },
}: {
  params: { category: string };
}) {
  const { id, name } = await getCategoryById(category);

  return <div>{name}에 해당하는 포스트 목록 입니다.</div>;
}
