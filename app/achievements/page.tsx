"use client" // クライアントコンポーネントにする

import React from "react"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { Button } from "../components/ui/button"
import { Trophy, Briefcase, Rocket, Calendar } from "lucide-react"

// 実績の型定義
type Achievement = {
  month: string
  achievements: string[]
  media?: {
    type: "image"
    url: string
    alt: string
  }
}

// 実績データ
const achievements: Achievement[] = [
  {
    month: "January",
    achievements: ["・獣医学ノート事業化"],
    media: {
      type: "image",
      url: "/logo.jpg", // publicディレクトリにlogo.jpgを配置してください
      alt: "獣医学ノート Logo",
    },
  },
  {
    month: "February",
    achievements: ["・株式会社アンドエーアイ（&AI） インターン参加"],
  },
  {
    month: "March",
    achievements: ["・青山学院大学150周年企画でトーク出演"],
  },
  // ... 必要に応じて増やしてください
]

function getIcon(achievement: string) {
  // キーワードに応じてアイコンを返すサンプル
  if (achievement.includes("ハッカソン") || achievement.includes("優勝")) {
    return <Trophy className="w-4 h-4 mr-2 inline-block text-yellow-500" />
  } else if (achievement.includes("インターン")) {
    return <Briefcase className="w-4 h-4 mr-2 inline-block text-blue-500" />
  } else if (achievement.includes("リリース")) {
    return <Rocket className="w-4 h-4 mr-2 inline-block text-green-500" />
  } else {
    return <Calendar className="w-4 h-4 mr-2 inline-block text-gray-500" />
  }
}

export default function AchievementsPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Achievements</h1>

      {/* 横幅を指定したスクロール領域 */}
      <ScrollArea className="h-[75vh] border border-gray-200 rounded p-4">
        {achievements.map((ach, idx) => (
          <Card key={idx} className="mb-4">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {ach.month}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* 画像がある月だけ表示 */}
              {ach.media && ach.media.type === "image" && (
                <Image
                  src={ach.media.url}
                  alt={ach.media.alt}
                  width={300}
                  height={150}
                  className="mb-3 rounded border"
                />
              )}

              <ul className="space-y-2">
                {ach.achievements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    {getIcon(item)}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>

      {/* 何かアクション用のボタン例 */}
      <div className="mt-8">
        <Button onClick={() => alert("Hello!")}>Contact Me</Button>
      </div>
    </main>
  )
}
