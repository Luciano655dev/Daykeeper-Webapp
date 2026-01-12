export type ThemeMode = "light" | "dark" | "system"

const KEY = "dk-theme"

export function getTheme(): ThemeMode {
  if (typeof window === "undefined") return "system"
  return (localStorage.getItem(KEY) as ThemeMode) || "system"
}

export function setTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, mode)
  applyTheme(mode)
}

export function applyTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return
  const root = document.documentElement

  const resolved =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode

  if (resolved === "dark") root.setAttribute("data-theme", "dark")
  else root.removeAttribute("data-theme")
}
