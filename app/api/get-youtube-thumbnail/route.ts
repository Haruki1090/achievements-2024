// 例: /app/api/get-youtube-thumbnail/route.ts
// これはapp routerでAPI Routeを作り、フロントから呼び出すイメージ

import { NextResponse } from "next/server"

export async function GET() {
  const videoId = "Z_RwdZDQXRE"
  const apiKey = process.env.YOUTUBE_API_KEY // APIキーが必要
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`

  const res = await fetch(url)
  const data = await res.json()

  const snippet = data.items?.[0]?.snippet
  if (!snippet) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 })
  }

  // 取得したsnippet.snippets.thumbnailsに色々サイズがある
  return NextResponse.json({
    title: snippet.title,
    thumbnails: snippet.thumbnails,
  })
}
