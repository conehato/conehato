interface ArticleViewContentProps {
  content: string;
}
export function ArticleViewContent({ content }: ArticleViewContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
