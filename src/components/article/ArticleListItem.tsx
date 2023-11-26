import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import placeholderImage from "@/assets/common/placeholderImage.png";
import { dayjsInitialization } from "@/lib/dayjs";
import { imageUrlInHtml } from "@/lib/regex";
import { ArticleEntity } from "@/models";

interface ArticleListItemProps {
  article: ArticleEntity;
  page: number;
}
export function ArticleListItem({ article, page }: ArticleListItemProps) {
  dayjsInitialization();

  const imageUrl = getImageInHtml(article.contents);

  return (
    <Link
      href={{
        pathname: `/${article.category}/${article.id}`,
        query: `page=${page}`,
      }}
      className="flex py-1 px-2 gap-2"
    >
      <div className="flex w-20 h-[58px]">
        {imageUrl ? (
          <Image
            alt={article.title}
            src={imageUrl}
            width={80}
            height={58}
            className="flex w-full object-cover"
          />
        ) : (
          <Image
            className="flex w-full object-cover"
            src={placeholderImage}
            alt="placeholder"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex gap-2">
          <p className="line-clamp-1 text-base/[1.25rem] text-sky-600">
            {article.title}
          </p>
          <p className="text-base/[1.25rem] text-sky-700">{` [${article.comments.length}]`}</p>
        </div>
        <div className="flex flex-col gap-1 pb-0.5">
          <p className="line-clamp-1 text-xs text-stone-700">
            {/* TODO: name으로 변경 */}
            {article.category as any}
          </p>
          <p className=" line-clamp-1 text-xs text-stone-500">
            {/* TODO: 조회수를 추천으로 변경 */}
            {`${article.anonymous.name} | ${dayjs(
              article.createdAt
            ).fromNow()} | 조회수 ${article.views}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

function getImageInHtml(contents: string) {
  const imageUrl = contents.match(imageUrlInHtml)?.[0];
  if (!imageUrl) return undefined;
  return imageUrl.split(`"`)[1];
}
