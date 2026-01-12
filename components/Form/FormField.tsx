"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { brand } from "../brand"

type Props = {
  label: string
  rightSlot?: React.ReactNode
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export default function FormField({ label, rightSlot, inputProps }: Props) {
  const isPassword = inputProps?.type === "password"
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium" style={{ color: brand.ink }}>
          {label}
        </label>
        {rightSlot ? rightSlot : null}
      </div>

      <div className="relative mt-2">
        <input
          {...inputProps}
          type={
            isPassword ? (showPassword ? "text" : "password") : inputProps?.type
          }
          className="w-full rounded-xl border px-4 py-3 pr-11 text-sm outline-none transition"
          style={{
            background: brand.paper,
            borderColor: "rgba(15, 23, 42, 0.12)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = brand.sky)}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.12)")
          }
        />

        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center"
            style={{ color: brand.slate }}
          >
            {showPassword ? (
              <EyeOff
                size={18}
                color={brand.slate}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <Eye
                size={18}
                color={brand.slate}
                style={{ cursor: "pointer" }}
              />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
