import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "コネハト",
  // TODO: conehato의 공식적인 설명 작성 필요
  description: "conehato is best",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={cn("flex justify-center", inter.className)}>
        <div className="max-w-3xl w-full">{children}</div>
      </body>
      <Analytics />
    </html>
  );
}
