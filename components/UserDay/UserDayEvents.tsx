"use client"

import { CalendarDays, ArrowRight } from "lucide-react"
import SeeMoreList from "./SeeMoreList"
import UserDayListRow from "./UserDayListRow"
import SeeMoreRow from "./SeeMoreRow"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

// week key using "week starts on Sunday" (matches JS default feel)
// If you prefer Monday-start week, tell me and I’ll switch it.
function weekKey(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  const day = x.getDay() // 0..6 (Sun..Sat)
  x.setDate(x.getDate() - day) // go back to Sunday
  return x.toISOString().slice(0, 10) // YYYY-MM-DD of that week's Sunday
}

function formatShortWeekdayTime(d: Date) {
  const weekday = d.toLocaleDateString([], { weekday: "short" }) // Tue
  const hh = pad2(d.getHours())
  const mm = pad2(d.getMinutes())
  return `${weekday} ${hh}:${mm}`
}

function formatFullDDMMYYYYTime(d: Date) {
  const dd = pad2(d.getDate())
  const mm = pad2(d.getMonth() + 1)
  const yyyy = d.getFullYear()
  const hh = pad2(d.getHours())
  const min = pad2(d.getMinutes())
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

function formatEventTimeRange(startISO?: string, endISO?: string) {
  const start = startISO ? new Date(startISO) : null
  const end = endISO ? new Date(endISO) : null

  if (!start) return { startText: "", endText: "" }

  const crossesWeek = !!end && weekKey(start) !== weekKey(end)

  const fmt = crossesWeek ? formatFullDDMMYYYYTime : formatShortWeekdayTime

  return {
    startText: fmt(start),
    endText: end ? fmt(end) : "",
  }
}

export default function UserDayEvents({
  events,
  initialCount = 3,
}: {
  events?: any[]
  initialCount?: number
}) {
  if (!events?.length)
    return <div className="text-sm text-(--dk-slate)">No events.</div>

  return (
    <SeeMoreList items={events} initialCount={initialCount}>
      {({ visible, hiddenCount, expanded, toggle }) => (
        <div className="space-y-1">
          {visible.map((ev: any) => {
            const { startText, endText } = formatEventTimeRange(
              ev.dateStartLocal || ev.dateStart,
              ev.dateEndLocal || ev.dateEnd
            )

            return (
              <UserDayListRow
                key={ev._id}
                leftIcon={<CalendarDays size={18} />}
                title={ev.title}
                right={
                  <div className="inline-flex items-center gap-2 rounded-xl border border-(--dk-ink)/10 bg-(--dk-mist)/35 px-2.5 py-1 text-xs">
                    <span className="font-semibold text-(--dk-ink)">
                      {startText}
                    </span>
                    {endText ? (
                      <>
                        <ArrowRight
                          size={12}
                          className="text-(--dk-slate)/70"
                        />
                        <span className="font-semibold text-(--dk-ink)">
                          {endText}
                        </span>
                      </>
                    ) : null}
                  </div>
                }
              />
            )
          })}

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
