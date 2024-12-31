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
  ExternalLink,
  Youtube,
  Twitter,
  Github,
} from "lucide-react"

/* ----------------------------------
 * 1. シンプルな Button
 * ---------------------------------- */
function Button({
  children,
  onClick,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline"
}) {
  const baseStyle = `inline-flex items-center justify-center px-4 py-2 
    rounded shadow-md font-semibold transition-colors`
  let variantStyle = ""
  if (variant === "default") {
    variantStyle = `bg-blue-600 text-white hover:bg-blue-700`
  } else if (variant === "outline") {
    variantStyle = `border border-gray-300 bg-white text-gray-700 hover:bg-gray-50`
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  )
}

/* ----------------------------------
 * 2. シンプルな Card
 * ---------------------------------- */
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
        rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  )
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>
}
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold tracking-wide text-gray-800">{children}</h2>
}
function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700">{children}</div>
}

/* ----------------------------------
 * 3. リンク用アイコンを返す関数
 * ---------------------------------- */
function getLinkIcon(type: string) {
  switch (type) {
    case "youtube":
      return <Youtube className="w-4 h-4" />
    case "x":
    case "twitter":
      return <Twitter className="w-4 h-4" />
    case "github":
      return <Github className="w-4 h-4" />
    default:
      return <ExternalLink className="w-4 h-4" />
  }
}

/* ----------------------------------
 * 4. 実績の型
 * ---------------------------------- */
type LinkItem = {
  label: string
  url: string
  type?: "x" | "youtube" | "github" | "note" | "site" | "article"
}

type Achievement = {
  month: string
  achievements: string[]
  media?: {
    type: "image"
    url: string
    alt: string
  }
  links?: LinkItem[]
}

/* ----------------------------------
 * 5. 実績データ
 * ---------------------------------- */
const achievementsData: Achievement[] = [
  {
    month: "January",
    achievements: ["・獣医学ノート事業化"],
    media: {
      type: "image",
      url: "/logo.jpg", // publicに小さめのロゴを用意
      alt: "Jyuuigakunote Logo",
    },
    links: [
      {
        label: "公式サイトはこちら",
        url: "https://www.jyuuigakunote.com/",
        type: "site",
      },
    ],
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
    // YouTubeサムネ用の例：実際には本動画のサムネ画像URLに差し替えてください
    media: {
      type: "image",
      url: "/thumbnail.jpg",
      alt: "青学TVサムネイル",
    },
    links: [
      {
        label: "YouTubeで見る",
        url: "https://youtu.be/Z_RwdZDQXRE?si=ux-Wxh0Jpc04biiD",
        type: "youtube",
      },
    ],
  },
  {
    month: "May",
    achievements: ["・ワンキャリアエンジニアインターン参加"],
  },
  {
    month: "July",
    achievements: ["・Benesse Flutter ハッカソン **準優勝**"],
    links: [
      {
        label: "GitHubソースコード",
        url: "https://github.com/Haruki1090/benesse_hackathon_2024_08",
        type: "github",
      },
    ],
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
    links: [
      {
        label: "ECサイトURL",
        url: "https://www.jyuuigakunote.com/",
        type: "site",
      },
      {
        label: "Xポスト",
        url: "https://x.com/Haruki_dev/status/1829433874759426085",
        type: "x",
      },
    ],
  },
  {
    month: "September",
    achievements: [
      "・ゴールドマンサックスワークショップ参加",
      "・Amazon Web Service インターンシップ参加",
      "・**Mercari AI / LLM hackathon** **優勝**",
    ],
    links: [
      {
        label: "Xポスト",
        url: "https://x.com/Haruki_dev/status/1839676238295687229",
        type: "x",
      },
      {
        label: "開催レポート",
        url: "https://careers.mercari.com/mercan/articles/46255/",
        type: "article",
      },
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
    links: [
      {
        label: "Xポスト (登壇)",
        url: "https://x.com/Haruki_dev/status/1855149432343515639",
        type: "x",
      },
      {
        label: "YouTube (発表)",
        url: "https://www.youtube.com/live/LtveFk3s5IY?si=G7NPcs52-R7u_BCu&t=1605",
        type: "youtube",
      },
      {
        label: "Xポスト (優秀賞)",
        url: "https://x.com/Haruki_dev/status/1862784662093107256",
        type: "x",
      },
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
    links: [
      {
        label: "Xポスト (社会人向けNotion講座)",
        url: "https://x.com/Haruki_dev/status/1865897284728393834",
        type: "x",
      },
      {
        label: "Xポスト (NotionAPI講座)",
        url: "https://x.com/Haruki_dev/status/1860995357326610875",
        type: "x",
      },
      {
        label: "Xポスト (Integrition参画)",
        url: "https://x.com/Haruki_dev/status/1867056775649956246",
        type: "x",
      },
      {
        label: "Xポスト (SoftBank satto 優勝)",
        url: "https://x.com/Haruki_dev/status/1865616870994489852",
        type: "x",
      },
      {
        label: "note 記事",
        url: "https://note.com/haruki___bz/n/n5f7410bdefdb?sub_rt=share_pw",
        type: "note",
      },
    ],
  },
]

/* ----------------------------------
 * 6. 実績アイコン
 * ---------------------------------- */
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

/* ----------------------------------
 * 7. 実績統計（Stats）
 * ---------------------------------- */
function Stats({ achievements }: { achievements: Achievement[] }) {
  const totalItems = achievements.reduce(
    (acc, curr) => acc + curr.achievements.length,
    0
  )
  const totalReleases = achievements.reduce(
    (acc, curr) =>
      acc + curr.achievements.filter((a) => a.includes("リリース")).length,
    0
  )
  const totalWins = achievements.reduce(
    (acc, curr) =>
      acc +
      curr.achievements.filter((a) => a.includes("優勝") || a.includes("入賞"))
        .length,
    0
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
      <Card className="text-center">
        <CardHeader>
          <Award className="w-6 h-6 mx-auto text-pink-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalItems}</p>
          <p className="text-gray-600 text-sm">Total Achievements</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <Rocket className="w-6 h-6 mx-auto text-green-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalReleases}</p>
          <p className="text-gray-600 text-sm">Releases</p>
        </CardContent>
      </Card>
      <Card className="text-center">
        <CardHeader>
          <Trophy className="w-6 h-6 mx-auto text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{totalWins}</p>
          <p className="text-gray-600 text-sm">Wins</p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ----------------------------------
 * 8. ページ本体
 * ---------------------------------- */
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
      {/* Hero Section */}
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

      {/* Body */}
      <section
        id="achievements-body"
        className="container mx-auto px-4 py-8 flex-1"
      >
        {/* Stats */}
        <Stats achievements={achievementsData} />

        {/* Achievements List (no scroll) */}
        {achievementsData.map((ach, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{ach.month}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* 画像がある場合は表示 */}
              {ach.media && ach.media.type === "image" && (
                <div className="mb-3">
                  <Image
                    src={ach.media.url}
                    alt={ach.media.alt}
                    width={180}   // 小さめに
                    height={120}
                    className="rounded border object-contain"
                  />
                </div>
              )}

              {/* 実績リスト */}
              <ul className="space-y-2 mb-4">
                {ach.achievements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    {getIcon(item)}
                    <span
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

              {/* リンクリスト */}
              {ach.links && ach.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ach.links.map((link, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      onClick={() => window.open(link.url, "_blank")}
                      className="gap-1 text-sm"
                    >
                      {getLinkIcon(link.type || "site")}
                      <span>{link.label}</span>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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
