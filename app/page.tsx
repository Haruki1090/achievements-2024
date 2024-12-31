/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { marked } from "marked";
import {
  Trophy,
  Briefcase,
  Rocket,
  Calendar,
  Award,
  ExternalLink,
  Youtube,
  Twitter,
  Github,
} from "lucide-react";

/* ----------------------------------
 * 1. シンプルな Card
 * ---------------------------------- */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm border border-gray-200 
        rounded-lg shadow-sm p-4 mb-4 hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700">{children}</div>;
}

/* ----------------------------------
 * 2. 埋め込みコンポーネント
 * ---------------------------------- */
function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <div className="relative w-full pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function XEmbed({ tweetUrl }: { tweetUrl: string }) {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.twttr) {
      // @ts-ignore
      window.twttr.widgets.load(tweetRef.current);
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        window.twttr.widgets.load(tweetRef.current);
      };
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [tweetUrl]);

  return (
    <div ref={tweetRef} className="max-w-xl">
      <blockquote className="twitter-tweet" data-theme="light">
        <a href={tweetUrl}>Loading tweet...</a>
      </blockquote>
    </div>
  );
}


/* ----------------------------------
 * 3. リンク用アイコンを返す関数
 * ---------------------------------- */
function getLinkIcon(type: string) {
  switch (type) {
    case "youtube":
      return <Youtube className="w-4 h-4" />;
    case "x":
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}

/* ----------------------------------
 * 4. 実績アイコン
 * ---------------------------------- */
function getIcon(text: string) {
  if (
    text.includes("ハッカソン") ||
    text.includes("優勝") ||
    text.includes("入賞")
  ) {
    return <Trophy className="w-4 h-4 mr-1 text-yellow-500" />;
  } else if (text.includes("インターン")) {
    return <Briefcase className="w-4 h-4 mr-1 text-blue-500" />;
  } else if (text.includes("リリース")) {
    return <Rocket className="w-4 h-4 mr-1 text-green-500" />;
  } else {
    return <Calendar className="w-4 h-4 mr-1 text-gray-500" />;
  }
}

/* ----------------------------------
 * 5. 型定義
 * ---------------------------------- */
type LinkItem = {
  label: string;
  url: string;
  type?: "x" | "youtube" | "github" | "note" | "site" | "article";
  embedId?: string;
  embedUrl?: string;
};

type Achievement = {
  month: string;
  achievements: string[];
  media?: {
    type: "image" | "youtube" | "x";
    url?: string;
    alt?: string;
    youtubeVideoId?: string;
    tweetUrl?: string;
  };
  links?: LinkItem[];
};

/* ----------------------------------
 * 6. 実績データ
 * ---------------------------------- */
const achievementsData: Achievement[] = [
  {
    month: "1月", // January → 1月
    achievements: ["・獣医学ノート事業化"],
    media: {
      type: "image",
      url: "/logo.jpg",
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
    month: "2月", // February → 2月
    achievements: ["・株式会社アンドエーアイ（&AI）にインターン生として加入"],
  },
  {
    month: "3月", // March → 3月
    achievements: [
      "・青山学院大学150周年企画 青学TV 田中みなみ様との対談トークに出演",
    ],
    links: [
      {
        label: "YouTubeで見る",
        url: "https://youtu.be/Z_RwdZDQXRE?si=ux-Wxh0Jpc04biiD",
        type: "youtube",
      },
    ],
  },
  {
    month: "5月", // May → 5月
    achievements: ["・ワンキャリアエンジニアインターン参加"],
  },
  {
    month: "7月", // July → 7月
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
    month: "8月", // August → 8月
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
    month: "9月", // September → 9月
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
    month: "10月", // October → 10月
    achievements: ["・Kaigi on Rails スカラシップ参加"],
  },
  {
    month: "11月", // November → 11月
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
    month: "12月", // December → 12月
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
];

/* ----------------------------------
 * 7. 実績統計（Stats）
 * ---------------------------------- */
function Stats({ achievements }: { achievements: Achievement[] }) {
  const totalItems = achievements.reduce(
    (acc, curr) => acc + curr.achievements.length,
    0
  );
  const totalReleases = achievements.reduce(
    (acc, curr) =>
      acc + curr.achievements.filter((a) => a.includes("リリース")).length,
    0
  );
  const totalWins = achievements.reduce(
    (acc, curr) =>
      acc +
      curr.achievements.filter((a) => a.includes("優勝") || a.includes("入賞"))
        .length,
    0
  );

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
  );
}

/* ----------------------------------
 * 8. メインの実績表示コンポーネント
 * ---------------------------------- */
export default function Achievements() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">2024年の実績</h1>

      {/* 統計情報の表示 */}
      <Stats achievements={achievementsData} />

      {/* 月ごとの実績リスト */}
      <div className="space-y-8">
        {achievementsData.map((monthData, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white shadow-sm">
            {/* 月表示 */}
            <h2 className="text-xl font-semibold mb-4">{monthData.month}</h2>

            {/* 実績リスト */}
            <div className="space-y-2 mb-4">
              {monthData.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start">
                  {getIcon(achievement)}
                  <div
                    className="prose prose-sm"
                    dangerouslySetInnerHTML={{
                      __html: marked(achievement, { breaks: true }),
                    }}
                  />
                </div>
              ))}
            </div>

            {/* メディア表示 */}
            {monthData.media && (
              <div className="my-4">
                {monthData.media.type === "image" && monthData.media.url && (
                  <Image
                    src={monthData.media.url}
                    alt={monthData.media.alt || ""}
                    width={400}
                    height={300}
                    className="rounded-lg"
                  />
                )}
                {monthData.media.type === "youtube" &&
                  monthData.media.youtubeVideoId && (
                    <YouTubeEmbed videoId={monthData.media.youtubeVideoId} />
                  )}
                {monthData.media.type === "x" && monthData.media.tweetUrl && (
                  <XEmbed tweetUrl={monthData.media.tweetUrl} />
                )}
              </div>
            )}

            {/* リンク表示 */}
            {monthData.links && monthData.links.length > 0 && (
              <div className="mt-4 space-y-4">
                {monthData.links.map((link, i) => (
                  <div key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-2"
                    >
                      {getLinkIcon(link.type || "default")}
                      {link.label}
                    </a>

                    {/* YouTube埋め込み */}
                    {link.type === "youtube" && link.url && (
                      <div className="mt-2">
                        <YouTubeEmbed
                          videoId={link.url.split("v=")[1]?.split("&")[0] || ""}
                        />
                      </div>
                    )}

                    {/* X/Twitter埋め込み */}
                    {link.type === "x" && link.url && (
                      <div className="mt-2">
                        <XEmbed tweetUrl={link.url} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
