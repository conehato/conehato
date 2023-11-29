interface ArticleViewContentProps {
  content: string;
}
export function ArticleViewContent({ content }: ArticleViewContentProps) {
  return <div　className="px-3" dangerouslySetInnerHTML={{ __html: content }} />;
}
