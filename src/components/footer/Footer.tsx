import Link from "next/link";

import { contacts } from "@/lib/constants";

export function Footer() {
  const renderFormattedEmailUrl = (url: string) => {
    return (
      <Link
        className="text-xs"
        target="_blank"
        href={`mailto:${url}?subject=お問い合わせ?body=안녕하세요 코네하츠입니다.%0D%0A문의 또는 신고 내용을 자세히 적어주세요.%0D%0A`}
      >
        お問い合わせ : {url}
      </Link>
    );
  };

  return (
    <div className="flex flex-col w-screen p-2 justify-center items-center bg-white border-t">
      <div className="flex text-xs w-full py-1 justify-center">
        {renderFormattedEmailUrl(contacts.email)}
      </div>
    </div>
  );
}
