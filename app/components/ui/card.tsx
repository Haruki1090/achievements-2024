// components/ui/card.tsx
"use client"

import React from "react"

export function Card({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border border-gray-200 rounded shadow-sm p-4 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Header
export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

// Title
export function CardTitle({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={`font-semibold text-lg ${className}`} {...props}>
      {children}
    </h2>
  )
}

// Content
export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-sm text-gray-700 ${className}`} {...props}>
      {children}
    </div>
  )
}
