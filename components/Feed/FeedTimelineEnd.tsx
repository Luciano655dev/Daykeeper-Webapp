"use client"

import { CheckCircle2 } from "lucide-react"

type Props = {
  dateLabel?: string
}

export default function FeedTimelineEnd({ dateLabel }: Props) {
  return (
    <div className="text-center py-10 px-4">
      <div className="w-14 h-14 bg-(--dk-mist) rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={28} className="text-(--dk-sky)" />
      </div>

      <h3 className="text-base font-semibold text-(--dk-ink) mb-1">
        You’re all caught up
      </h3>

      <p className="text-sm text-(--dk-slate)">
        {dateLabel
          ? `That’s everything people shared on ${dateLabel}.`
          : "That’s everything people shared for this day."}
      </p>
    </div>
  )
}
