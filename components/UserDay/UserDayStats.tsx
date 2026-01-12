"use client"

import { CheckSquare, Calendar, List } from "lucide-react"

type Stats = {
  tasksCount?: number
  notesCount?: number
  eventsCount?: number
}

export default function UserDayStatsBar({
  stats,
  entriesCount, // optional (posts count)
}: {
  stats?: Stats
  entriesCount?: number
}) {
  const tasks = stats?.tasksCount ?? 0
  const notes = stats?.notesCount ?? 0
  const events = stats?.eventsCount ?? 0

  return (
    <div className="px-4 py-3">
      <div className="rounded-2xl border border-(--dk-ink)/10 bg-(--dk-mist)/65 px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-(--dk-slate)">
          {/* DAY label */}
          <span className="font-semibold tracking-wide text-(--dk-slate)">
            DAY
          </span>

          <Separator />

          {/* entries (optional) */}
          {typeof entriesCount === "number" ? (
            <>
              <span>
                <span className="font-semibold text-(--dk-ink)">
                  {entriesCount}
                </span>{" "}
                entries
              </span>
              <Separator />
            </>
          ) : null}

          {/* tasks */}
          <MetaItem Icon={CheckSquare} value={tasks} label="tasks" />
          <Separator />

          {/* events */}
          <MetaItem Icon={Calendar} value={events} label="events" />
          <Separator />

          {/* notes */}
          <MetaItem Icon={List} value={notes} label="notes" />
        </div>
      </div>
    </div>
  )
}

function MetaItem({
  Icon,
  value,
  label,
}: {
  Icon: React.ComponentType<any>
  value: number
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon size={15} className="text-(--dk-slate)" />
      <span className="font-semibold text-(--dk-ink)">{value}</span>{" "}
      <span>{label}</span>
    </span>
  )
}

function Separator() {
  return <span className="h-1 w-1 rounded-full bg-(--dk-ink)/20" />
}
