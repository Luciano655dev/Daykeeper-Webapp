"use client"

import { brand } from "../brand"

export default function FormSocialButton({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) {
  const disabled = true
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition"
      style={{
        background: brand.mist,
        borderColor: "rgba(15, 23, 42, 0.12)",
        color: brand.ink,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "40%" : "100%",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  )
}
