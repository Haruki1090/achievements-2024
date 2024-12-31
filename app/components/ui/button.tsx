// components/ui/button.tsx
"use client"

import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

/**
 * 超シンプルなボタンコンポーネント。
 * Tailwindでデザインを直接書いています。
 */
export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none ${className}`}
      {...props}
    />
  )
}
