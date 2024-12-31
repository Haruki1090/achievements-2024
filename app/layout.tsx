// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";

// メタデータ（ブラウザタブのタイトルや説明）
export const metadata = {
  title: "My App",
  description: "Simple Next.js + Tailwind CSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
