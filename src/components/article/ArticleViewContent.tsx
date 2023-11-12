interface ArticleViewContentProps {
  content: string;
}
export function ArticleViewContent({ content }: ArticleViewContentProps) {
  return <div　className="px-3 mb-10" dangerouslySetInnerHTML={{ __html: content }} />;
}
