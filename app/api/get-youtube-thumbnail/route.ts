import { NextResponse } from "next/server"

/**
 * YouTube Data APIを使って動画IDからtitleやthumbnailsを取得
 *  - APIキーは環境変数 YOUTUBE_API_KEY から
 *
 * 【注意】
 *  - 実運用ではエラーハンドリングや rate-limit 対策など追加検討が必要
 */
export async function GET() {
  // 例: このIDを固定で取得
  const videoId = "Z_RwdZDQXRE" // 実際に埋め込みたいYouTube動画IDに変更
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing YOUTUBE_API_KEY" },
      { status: 500 }
    )
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json(
      { error: "YouTube API fetch failed" },
      { status: res.status }
    )
  }

  const data = await res.json()
  const snippet = data.items?.[0]?.snippet
  if (!snippet) {
    return NextResponse.json(
      { error: "Video not found or snippet missing" },
      { status: 404 }
    )
  }

  return NextResponse.json({
    title: snippet.title,
    description: snippet.description,
    thumbnails: snippet.thumbnails,
  })
}
