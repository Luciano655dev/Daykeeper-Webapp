"use client"

import { StickyNote, Clock } from "lucide-react"
import SeeMoreList from "./SeeMoreList"
import UserDayListRow from "./UserDayListRow"
import SeeMoreRow from "./SeeMoreRow"
import PrivacyChip from "@/components/common/PrivacyChip"

function formatTime(s?: string) {
  if (!s) return ""
  const d = new Date(s)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function UserDayNotes({
  notes,
  initialCount = 3,
}: {
  notes?: any[]
  initialCount?: number
}) {
  if (!notes?.length)
    return <div className="text-sm text-(--dk-slate)">No notes.</div>

  return (
    <SeeMoreList items={notes} initialCount={initialCount}>
      {({ visible, hiddenCount, expanded, toggle }) => (
        <div className="space-y-1">
          {visible.map((n: any) => (
            <UserDayListRow
              key={n._id}
              leftIcon={<StickyNote size={18} />}
              title={<span className="whitespace-pre-wrap">{n.text}</span>}
              metaTop={
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {formatTime(n.dateLocal || n.date)}
                  </span>

                  <PrivacyChip privacy={n.privacy} />
                </span>
              }
            />
          ))}

          {hiddenCount > 0 ? (
            <SeeMoreRow
              hiddenCount={hiddenCount}
              expanded={expanded}
              onClick={toggle}
            />
          ) : null}
        </div>
      )}
    </SeeMoreList>
  )
}
