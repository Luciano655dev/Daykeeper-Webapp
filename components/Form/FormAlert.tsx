import React from "react"

type Type = "error" | "success" | "info"

const styles: Record<Type, React.CSSProperties> = {
  error: {
    background: "#FFF5F5",
    borderColor: "rgba(239, 68, 68, 0.25)",
    color: "#B91C1C",
  },
  success: {
    background: "#F0FDF4",
    borderColor: "rgba(34, 197, 94, 0.25)",
    color: "#15803D",
  },
  info: {
    background: "#EFF6FF",
    borderColor: "rgba(59, 130, 246, 0.25)",
    color: "#1D4ED8",
  },
}

export default function FormAlert({
  children,
  type = "error",
}: {
  children: React.ReactNode
  type?: Type
}) {
  return (
    <div
      className="mb-4 rounded-xl border px-4 py-3 text-sm"
      style={styles[type]}
    >
      {children}
    </div>
  )
}
