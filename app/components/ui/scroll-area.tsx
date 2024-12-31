// components/ui/scroll-area.tsx
"use client"

import React from "react"

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement>

/**
 * 単に overflow-y: auto を当て、簡単なスクロールバーをつけるだけ。
 */
export function ScrollArea({ children, className = "", ...props }: ScrollAreaProps) {
  return (
    <div
      className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
