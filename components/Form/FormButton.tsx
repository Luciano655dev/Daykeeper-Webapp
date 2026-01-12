"use client"

import { brand } from "../brand"

export default function FormButton({
  children,
  disabled,
  type = "button",
  onClick,
  fancy = true,
}: {
  children: React.ReactNode
  disabled?: boolean
  type?: "button" | "submit"
  onClick?: () => void
  fancy?: boolean
}) {
  if (fancy) {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="
        w-full rounded-xl px-4 py-3 text-sm font-medium
        transition-all duration-150 ease-out
        disabled:cursor-not-allowed disabled:opacity-60
        active:scale-[0.98]
      "
        style={{
          background: brand.sky,
          color: brand.paper,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08)",
        }}
        onMouseEnter={(e) => {
          if (disabled) return
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)"
          e.currentTarget.style.transform = "translateY(-1px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)"
          e.currentTarget.style.transform = "translateY(0)"
        }}
        onMouseDown={(e) => {
          if (disabled) return
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)"
        }}
        onMouseUp={(e) => {
          if (disabled) return
          e.currentTarget.style.transform = "translateY(-1px)"
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)"
        }}
      >
        {children}
      </button>
    )
  } else {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="
        w-full rounded-xl px-4 py-3 text-sm font-medium
        transition
        hover:brightness-95
        active:brightness-90
        disabled:cursor-not-allowed disabled:opacity-60
      "
        style={{
          backgroundColor: brand.sky,
          color: brand.paper,
        }}
      >
        {children}
      </button>
    )
  }
}
