// components/XEmbed.tsx
import { useEffect, useRef } from 'react'

interface XEmbedProps {
  url: string
}

export const XEmbed: React.FC<XEmbedProps> = ({ url }) => {
  const tweetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window.twttr && tweetRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.twttr.widgets.load(tweetRef.current)
    }
  }, [url])

  return (
    <div ref={tweetRef}>
      <blockquote className="twitter-tweet">
        <a href={url}></a>
      </blockquote>
    </div>
  )
}
