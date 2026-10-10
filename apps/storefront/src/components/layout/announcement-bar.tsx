"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Message = { text: string; href?: string }

export function AnnouncementBar({ messages }: { messages: Message[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (messages.length < 2) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % messages.length), 4500)
    return () => window.clearInterval(id)
  }, [messages.length])

  const message = messages[index]
  if (!message) return null
  const content = (
    <span key={index} className="inline-block animate-fade-in">
      {message.text}
    </span>
  )

  return (
    <div className="bg-ink text-ivory">
      <div className="container-ds flex h-9 items-center justify-center text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
        {message.href ? (
          <Link href={message.href} className="hover:underline">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  )
}
