import Link from "next/link";

import { contacts } from "@/lib/constants";

export function Footer() {
  const renderFormattedEmailUrl = (url: string) => {
    return (
      <Link
        className="text-xs"
        target="_blank"
        href={`mailto:${url}?subject=お問い合わせ?body=こんにちはコネハトです。%0D%0Aお問い合わせ内容を詳しく書いてください。%0D%0A`}
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
