// app/layout.tsx
import "./globals.css"
import { ReactNode } from "react"

// メタデータ（ブラウザタブのタイトルや説明）
export const metadata = {
  title: "My App",
  description: "Simple Next.js + Tailwind CSS",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
