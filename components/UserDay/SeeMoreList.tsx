"use client"

import { useMemo, useState } from "react"

export default function SeeMoreList<T>({
  items,
  initialCount = 3,
  children,
}: {
  items: T[]
  initialCount?: number
  children: (args: {
    visible: T[]
    expanded: boolean
    hiddenCount: number
    toggle: () => void
  }) => React.ReactNode
}) {
  const [expanded, setExpanded] = useState(false)

  const visible = useMemo(() => {
    if (expanded) return items
    return items.slice(0, initialCount)
  }, [items, expanded, initialCount])

  const hiddenCount = Math.max(0, items.length - initialCount)

  return (
    <>
      {children({
        visible,
        expanded,
        hiddenCount,
        toggle: () => setExpanded((v) => !v),
      })}
    </>
  )
}
