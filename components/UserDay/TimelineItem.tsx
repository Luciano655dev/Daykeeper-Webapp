"use client"

export default function TimelineItem({
  isLast,
  children,
}: {
  isLast: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {/* dot */}
      <div
        className="absolute top-5 w-3 h-3 rounded-full bg-(--dk-sky) shadow-sm"
        style={{ left: 0, transform: "translateX(-50%)" }}
      />

      {/* connector */}
      {!isLast ? (
        <div
          className="absolute top-8 w-px bg-(--dk-sky)/40"
          style={{
            left: 0,
            transform: "translateX(-50%)",
            height: "calc(100% + 1rem)",
          }}
        />
      ) : null}

      {/* content */}
      <div className="ml-8">{children}</div>
    </div>
  )
}
