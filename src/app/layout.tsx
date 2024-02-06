import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";

import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "コネハト",
  description:
    "匿名で様々な分野について話し合えるコミュニティサイト、Connecting Heartsコネハトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={cn("flex flex-col", notoSansJP.className)}>
        <div className="flex justify-center">
          <div className="max-w-3xl w-full">{children}</div>
        </div>
        <Footer />
        <Toaster />
      </body>
      <Analytics />
    </html>
  );
}
