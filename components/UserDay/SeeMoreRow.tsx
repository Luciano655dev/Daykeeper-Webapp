"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

export default function SeeMoreRow({
  hiddenCount,
  expanded,
  onClick,
}: {
  hiddenCount: number
  expanded: boolean
  onClick: () => void
}) {
  return (
    <div className="pt-2 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        className="
          appearance-none
          bg-transparent
          border-0
          p-0
          m-0
          inline-flex items-center gap-1
          text-xs text-(--dk-slate)
          hover:text-(--dk-ink)
          focus:outline-none
          transition
        "
      >
        <span>
          {expanded ? "Show less" : hiddenCount > 0 ? `See more` : "See more"}
        </span>

        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </div>
  )
}
