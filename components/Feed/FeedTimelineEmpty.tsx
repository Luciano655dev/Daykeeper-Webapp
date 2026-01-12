"use client"

import { Clock } from "lucide-react"

export default function FeedTimelineEmpty() {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-16 h-16 bg-(--dk-mist) rounded-full flex items-center justify-center mx-auto mb-4">
        <Clock size={32} className="text-(--dk-sky)" />
      </div>
      <h3 className="text-lg font-semibold text-(--dk-ink) mb-2">
        No posts for this day
      </h3>
      <p className="text-sm text-(--dk-slate)">
        Check out another day or create your first post!
      </p>
    </div>
  )
}
