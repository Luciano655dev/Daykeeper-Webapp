"use client"

type Props = {
  leftIcon: React.ReactNode
  metaTop?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  right?: React.ReactNode
  showLane?: boolean
}

export default function UserDayListRow({
  leftIcon,
  metaTop,
  title,
  subtitle,
  right,
  showLane = true,
}: Props) {
  return (
    <div className="py-3 px-2 -mx-2 rounded-lg hover:bg-(--dk-mist)/50 transition">
      <div className="flex items-center gap-3">
        {/* lane marker + icon */}
        <div className="flex items-center gap-3 shrink-0">
          {showLane ? (
            <div className="h-7 w-1 rounded-l-full rounded-r-md bg-(--dk-sky)/60" />
          ) : null}

          <div className="text-(--dk-sky) flex items-center">{leftIcon}</div>
        </div>

        {/* content (vertically centered) */}
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          {metaTop ? (
            <div className="text-xs text-(--dk-slate) leading-tight">
              {metaTop}
            </div>
          ) : null}

          <div className="text-sm font-medium text-(--dk-ink) truncate leading-snug">
            {title}
          </div>

          {subtitle ? (
            <div className="text-sm text-(--dk-slate) line-clamp-2 leading-snug">
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* right */}
        {right ? (
          <div className="shrink-0 flex items-center">{right}</div>
        ) : null}
      </div>
    </div>
  )
}
