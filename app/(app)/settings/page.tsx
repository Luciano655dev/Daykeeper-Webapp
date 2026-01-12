"use client"

import LogoutButton from "./LogoutButton"
import FetchUserButton from "./FetchUserButton"

import { getTheme, setTheme, type ThemeMode } from "@/lib/theme"
import { useEffect, useState } from "react"

export default function TopBar() {
  const [mode, setMode] = useState<ThemeMode>("system")

  useEffect(() => setMode(getTheme()), [])

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-4xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-(--dk-ink)/10 bg-(--dk-paper)">
        {/* quick swatches */}
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded-md border border-(--dk-ink)/10"
            style={{ background: "var(--dk-sky)" }}
            aria-label="Sky swatch"
          />
          <div
            className="h-6 w-6 rounded-md border border-(--dk-ink)/10"
            style={{ background: "var(--dk-ink)" }}
            aria-label="Ink swatch"
          />
          <div className="text-sm font-semibold text-(--dk-ink)">TopBar</div>
        </div>

        {/* actions */}
        <div className="flex items-center gap-3">
          <LogoutButton className="text-sm underline text-(--dk-ink) hover:text-(--dk-sky) transition">
            Logout
          </LogoutButton>

          <div className="hidden sm:block">
            <FetchUserButton />
          </div>
        </div>

        {/* theme buttons */}
        <div className="flex gap-2">
          {(["light", "dark", "system"] as ThemeMode[]).map((m) => {
            const active = mode === m

            return (
              <button
                key={m}
                className={[
                  "px-3 py-2 rounded-lg border text-sm font-medium transition cursor-pointer",
                  "border-(--dk-ink)/10 text-(--dk-ink)",
                  active
                    ? "bg-(--dk-mist)"
                    : "bg-(--dk-paper) hover:bg-(--dk-mist)",
                ].join(" ")}
                onClick={() => {
                  setMode(m)
                  setTheme(m)
                }}
                type="button"
              >
                {m}
              </button>
            )
          })}
        </div>

        {/* mobile fetch button */}
        <div className="sm:hidden w-full">
          <FetchUserButton />
        </div>
      </div>
    </div>
  )
}
