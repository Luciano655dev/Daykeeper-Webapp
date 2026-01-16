"use client"

import { brand } from "../brand"

type ButtonVariant = "primary" | "secondary" | "ghost"

export default function FormButton({
  children,
  disabled,
  type = "button",
  onClick,
  fancy = true,
  variant = "primary",
}: {
  children: React.ReactNode
  disabled?: boolean
  type?: "button" | "submit"
  onClick?: () => void
  fancy?: boolean
  variant?: ButtonVariant
}) {
  const styles = getVariantStyles(variant, disabled)

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
          ...styles.base,
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: styles.shadow,
        }}
        onMouseEnter={(e) => {
          if (disabled || !styles.hoverShadow) return
          e.currentTarget.style.boxShadow = styles.hoverShadow
          e.currentTarget.style.transform = "translateY(-1px)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = styles.shadow
          e.currentTarget.style.transform = "translateY(0)"
        }}
        onMouseDown={(e) => {
          if (disabled) return
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = styles.shadow
        }}
        onMouseUp={(e) => {
          if (disabled || !styles.hoverShadow) return
          e.currentTarget.style.transform = "translateY(-1px)"
          e.currentTarget.style.boxShadow = styles.hoverShadow
        }}
      >
        {children}
      </button>
    )
  }

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
      style={styles.base}
    >
      {children}
    </button>
  )
}

/* ---------------------------------- */

function getVariantStyles(variant: ButtonVariant, disabled?: boolean) {
  switch (variant) {
    case "secondary":
      return {
        base: {
          background: brand.paper,
          color: brand.sky,
          border: `1px solid ${brand.sky}33`,
        },
        shadow: "0 1px 0 rgba(0,0,0,0.05)",
        hoverShadow: "0 3px 10px rgba(0,0,0,0.08)",
      }

    case "ghost":
      return {
        base: {
          background: "transparent",
          color: brand.sky,
        },
        shadow: "none",
        hoverShadow: "none",
      }

    case "primary":
    default:
      return {
        base: {
          background: brand.sky,
          color: brand.paper,
        },
        shadow: "0 1px 0 rgba(0,0,0,0.08)",
        hoverShadow: disabled
          ? "0 1px 0 rgba(0,0,0,0.08)"
          : "0 4px 14px rgba(0,0,0,0.12)",
      }
  }
}
