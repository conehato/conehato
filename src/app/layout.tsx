import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={cn("flex justify-center overflow-y-auto", inter.className)}
      >
        <div className="max-w-3xl w-full">{children}</div>
      </body>
      <Analytics />
    </html>
  );
}
