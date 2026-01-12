"use client"

import { useMemo } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

export function toDDMMYYYY(d: Date) {
  return `${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()}`
}

function fromDDMMYYYY(s: string) {
  const [dd, mm, yyyy] = s.split("-").map((x) => Number(x))
  if (!dd || !mm || !yyyy) return new Date()
  return new Date(yyyy, mm - 1, dd)
}

function isAfterDay(a: string, b: string) {
  return fromDDMMYYYY(a).getTime() > fromDDMMYYYY(b).getTime()
}

function clampToToday(dateParam: string, todayParam: string) {
  return isAfterDay(dateParam, todayParam) ? todayParam : dateParam
}

function addDays(ddmmyyyy: string, delta: number) {
  const d = fromDDMMYYYY(ddmmyyyy)
  d.setDate(d.getDate() + delta)
  return toDDMMYYYY(d)
}

export default function UserDayTopBarControls({
  name,
  dateParam,
}: {
  name: string
  dateParam: string
}) {
  const router = useRouter()
  const todayParam = useMemo(() => toDDMMYYYY(new Date()), [])
  const canGoNext = dateParam !== todayParam

  function setDate(next: string) {
    const clamped = clampToToday(next, todayParam)
    router.push(
      `/day/${encodeURIComponent(name)}?date=${encodeURIComponent(clamped)}`
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className="h-9 w-9 rounded-lg hover:bg-(--dk-mist) transition grid place-items-center"
        onClick={() => setDate(addDays(dateParam, -1))}
        aria-label="Previous day"
      >
        <ChevronLeft size={18} className="text-(--dk-ink)" />
      </button>

      <div className="flex items-center gap-2 px-3 h-9 rounded-lg border border-(--dk-ink)/10 bg-(--dk-paper)">
        <Calendar size={16} className="text-(--dk-slate)" />
        <span className="text-sm font-semibold text-(--dk-ink)">
          {dateParam}
        </span>
      </div>

      <button
        className="h-9 w-9 rounded-lg hover:bg-(--dk-mist) transition grid place-items-center disabled:opacity-40 disabled:hover:bg-transparent"
        onClick={() => setDate(addDays(dateParam, +1))}
        aria-label="Next day"
        disabled={!canGoNext}
        title={!canGoNext ? "You can’t go past today" : "Next day"}
      >
        <ChevronRight size={18} className="text-(--dk-ink)" />
      </button>
    </div>
  )
}
