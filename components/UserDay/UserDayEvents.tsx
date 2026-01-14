"use client"

import { CalendarDays, ArrowRight, Clock } from "lucide-react"
import SeeMoreList from "./SeeMoreList"
import UserDayListRow from "./UserDayListRow"
import SeeMoreRow from "./SeeMoreRow"
import PrivacyChip from "@/components/common/PrivacyChip"

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

// week key using "week starts on Sunday"
function weekKey(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  const day = x.getDay()
  x.setDate(x.getDate() - day)
  return x.toISOString().slice(0, 10)
}

function formatShortWeekdayTime(d: Date) {
  const weekday = d.toLocaleDateString([], { weekday: "short" })
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

  return { startText: fmt(start), endText: end ? fmt(end) : "" }
}

function formatCreatedTime(iso?: string) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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

            // "created time" source (pick what you actually store)
            const createdISO =
              ev.created_at || ev.createdAt || ev.dateCreated || ev.date

            return (
              <UserDayListRow
                key={ev._id}
                leftIcon={<CalendarDays size={18} />}
                title={ev.title}
                metaTop={
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="inline-flex items-center gap-1.5 text-xs text-(--dk-slate) shrink-0">
                      <Clock size={12} />
                      {formatCreatedTime(createdISO)}
                    </span>

                    <div className="shrink-0">
                      <PrivacyChip privacy={ev.privacy} />
                    </div>
                  </div>
                }
                right={
                  <div className="flex items-center justify-end min-w-0 max-w-full">
                    <div
                      className={[
                        "inline-flex items-center gap-2",
                        "rounded-xl border border-(--dk-ink)/10 bg-(--dk-mist)/35",
                        "px-2.5 py-1 text-xs",
                        "max-w-full min-w-0",
                        "flex-wrap sm:flex-nowrap", // wrap on small, single-line on >=sm
                      ].join(" ")}
                    >
                      <span className="font-semibold text-(--dk-ink) whitespace-nowrap">
                        {startText}
                      </span>

                      {endText ? (
                        <>
                          <ArrowRight
                            size={12}
                            className="text-(--dk-slate)/70 shrink-0"
                          />
                          <span className="font-semibold text-(--dk-ink) whitespace-nowrap">
                            {endText}
                          </span>
                        </>
                      ) : null}
                    </div>
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
