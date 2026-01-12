"use client"

export default function UserDaySection({
  title,
  count,
  children,
}: {
  title: string
  count?: number
  children: React.ReactNode
}) {
  return (
    <section className="px-4 py-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-(--dk-ink)">{title}</div>
        <div className="text-xs text-(--dk-slate)">{count ?? 0}</div>
      </div>

      <div className="mt-3">{children}</div>
    </section>
  )
}
