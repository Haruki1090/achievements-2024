"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import {
  Trophy,
  Briefcase,
  Rocket,
  Calendar,
  Award,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react"

// =============================
// 1. シンプルなButton
// =============================
function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 
        text-white font-semibold rounded shadow-md hover:bg-blue-700 
        transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

// =============================
// 2. シンプルなCard
// =============================
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm border border-gray-200 
        rounded-lg shadow-sm p-4 ${className}`}
    >
      {children}
    </div>
  )
}

// Card内の見出し・本文を分ける場合
function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold tracking-wide text-gray-800">{children}</h2>
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700">{children}</div>
}

// =============================
// 3. シンプルなScrollArea
// =============================
function ScrollArea({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 
        scrollbar-track-gray-100 rounded ${className}`}
    >
      {children}
    </div>
  )
}

// =============================
// 4. 実績データの型定義
// =============================
type Achievement = {
  month: string
  achievements: string[]
  media?: {
    type: "image"
    url: string
    alt: string
  }
}

// =============================
// 5. 実績データ（全て反映）
// =============================
const achievementsData: Achievement[] = [
  {
    month: "January",
    achievements: ["・獣医学ノート事業化"],
    media: {
      type: "image",
      url: "/logo.jpg",  // サンプル画像。public/配下にlogo.jpgが必要
      alt: "logo",
    },
  },
  {
    month: "February",
    achievements: ["・株式会社アンドエーアイ（&AI）にインターン生として加入"],
  },
  {
    month: "March",
    achievements: [
      "・青山学院大学150周年企画 青学TV 田中みなみ様との対談トークに出演",
    ],
  },
  {
    month: "May",
    achievements: ["・ワンキャリアエンジニアインターン参加"],
  },
  {
    month: "July",
    achievements: ["・Benesse Flutter ハッカソン **準優勝**"],
  },
  {
    month: "August",
    achievements: [
      "・楽天エンジニアインターン参加",
      "・日立製作所インターン（営業）**優勝**",
      "・マネーフォワードインターン参加",
      "・獣医学ノートのECサイトをリリース",
      "・**Notion公式キャンパスリーダーに就任**",
    ],
  },
  {
    month: "September",
    achievements: [
      "・ゴールドマンサックスワークショップ参加",
      "・Amazon Web Service インターンシップ参加",
      "・**Mercari AI / LLM hackathon** **優勝**",
    ],
  },
  {
    month: "October",
    achievements: ["・Kaigi on Rails スカラシップ参加"],
  },
  {
    month: "November",
    achievements: [
      "・**Make with Notion Japan community event登壇**",
      "・**satto ハッカソン** **入賞**",
      "・IDEA FLASH Session AI **優秀賞**",
    ],
  },
  {
    month: "December",
    achievements: [
      "・社会人向けNotion講座開催",
      "・NotionAPI講座開催",
      "・**株式会社Integritionに参画**",
      "・**SoftBank satto ハッカソン** **優勝**",
    ],
  },
]

// =============================
// 6. アイコン判定
// =============================
function getIcon(text: string) {
  if (text.includes("ハッカソン") || text.includes("優勝") || text.includes("入賞")) {
    return <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
  } else if (text.includes("インターン")) {
    return <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
  } else if (text.includes("リリース")) {
    return <Rocket className="w-4 h-4 mr-1 text-green-500" />
  } else {
    return <Calendar className="w-4 h-4 mr-1 text-gray-500" />
  }
}

// =============================
// 7. 統計（合計数など）
// =============================
function Stats({ achievements }: { achievements: Achievement[] }) {
  const totalItems = achievements.reduce((acc, curr) => acc + curr.achievements.length, 0)
  const totalReleases = achievements.reduce(
    (acc, curr) =>
      acc + curr.achievements.filter((a) => a.includes("リリース")).length,
    0
  )
  const totalHackathonWins = achievements.reduce(
    (acc, curr) =>
      acc + curr.achievements.filter((a) => a.includes("優勝") || a.includes("入賞")).length,
    0
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      {/* カード1: Total Achievements */}
      <Card className="text-center">
        <CardHeader>
          <Award className="w-6 h-6 mx-auto text-pink-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalItems}</p>
          <p className="text-gray-500 text-sm">Total Achievements</p>
        </CardContent>
      </Card>

      {/* カード2: Releases */}
      <Card className="text-center">
        <CardHeader>
          <Rocket className="w-6 h-6 mx-auto text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalReleases}</p>
          <p className="text-gray-500 text-sm">Releases</p>
        </CardContent>
      </Card>

      {/* カード3: Hackathon Wins */}
      <Card className="text-center">
        <CardHeader>
          <Trophy className="w-6 h-6 mx-auto text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalHackathonWins}</p>
          <p className="text-gray-500 text-sm">Hackathon Wins</p>
        </CardContent>
      </Card>
    </div>
  )
}

// =============================
// 8. ページ本体
// =============================
export default function AchievementsPage() {
  const [showTopButton, setShowTopButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setShowTopButton(true)
      else setShowTopButton(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToAchievements = () => {
    const el = document.getElementById("achievements-body")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white relative">
      {/* ヒーローセクション */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-md mb-4">
            2024 Achievements
          </h1>
          <p className="text-lg mb-8 drop-shadow-sm">
            A journey through the year&apos;s accomplishments
          </p>
        </div>
        <Button
          onClick={scrollToAchievements}
          className="bg-white text-blue-600 hover:text-blue-800 font-bold"
        >
          <ArrowDownCircle className="w-5 h-5 mr-2" />
          View Achievements
        </Button>
      </section>

      {/* Achievements Body */}
      <section
        id="achievements-body"
        className="container mx-auto px-4 py-8 flex-1"
      >
        {/* Stats (統計表示) */}
        <Stats achievements={achievementsData} />

        {/* スクロール可能な実績リスト */}
        <ScrollArea className="max-h-[60vh] border rounded-lg p-4 shadow-inner">
          {achievementsData.map((ach, idx) => (
            <Card key={idx} className="mb-4 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{ach.month}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 画像がある場合のみ */}
                {ach.media && ach.media.type === "image" && (
                  <div className="mb-3">
                    <Image
                      src={ach.media.url}
                      alt={ach.media.alt}
                      width={400}
                      height={200}
                      className="rounded border object-cover"
                    />
                  </div>
                )}

                <ul className="space-y-2">
                  {ach.achievements.map((item, i) => (
                    <li key={i} className="flex items-start">
                      {getIcon(item)}
                      <span
                        // '**テキスト**' を <strong> に置き換えて強調表示
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-blue-600 font-bold">$1</strong>'
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </section>

      {/* ページ上部へ戻るボタン */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full 
          shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowUpCircle className="w-6 h-6" />
        </button>
      )}
    </main>
  )
}
