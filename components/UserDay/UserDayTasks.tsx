"use client"

import { CheckSquare2, Square, Clock, ClipboardList } from "lucide-react"
import SeeMoreList from "./SeeMoreList"
import UserDayListRow from "./UserDayListRow"
import SeeMoreRow from "./SeeMoreRow"

function formatTime(s?: string) {
  if (!s) return ""
  const d = new Date(s)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function TaskStatusPill({ done }: { done: boolean }) {
  const Icon = done ? CheckSquare2 : Square

  return (
    <div
      className={[
        "inline-flex items-center justify-center",
        "h-9 w-9 rounded-xl border",
        "transition",
        done
          ? "bg-(--dk-sky)/10 border-(--dk-sky)/25 text-(--dk-sky)"
          : "bg-(--dk-paper)/60 border-(--dk-ink)/10 text-(--dk-slate) hover:bg-(--dk-mist)/60",
      ].join(" ")}
      aria-label={done ? "Task completed" : "Task not completed"}
      title={done ? "Completed" : "Not completed"}
    >
      <Icon size={18} />
    </div>
  )
}

export default function UserDayTasks({
  tasks,
  initialCount = 3,
}: {
  tasks?: any[]
  initialCount?: number
}) {
  if (!tasks?.length)
    return <div className="text-sm text-(--dk-slate)">No tasks.</div>

  return (
    <SeeMoreList items={tasks} initialCount={initialCount}>
      {({ visible, hiddenCount, expanded, toggle }) => (
        <div className="space-y-1">
          {visible.map((t: any) => {
            const done = !!t.completed

            return (
              <UserDayListRow
                key={t._id}
                showLane
                leftIcon={<ClipboardList size={22} />}
                metaTop={
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {formatTime(t.dateLocal || t.date)}
                  </span>
                }
                title={
                  <span
                    className={[
                      done ? "opacity-80 line-through" : "",
                      "transition",
                    ].join(" ")}
                  >
                    {t.title}
                  </span>
                }
                right={<TaskStatusPill done={done} />}
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
