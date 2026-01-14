"use client"

import { useEffect } from "react"

export default function ModalShell({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onEsc)
    return () => document.removeEventListener("keydown", onEsc)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center px-4">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-(--dk-ink)/10 bg-(--dk-paper) shadow-xl p-4">
        <div className="text-sm font-semibold text-(--dk-ink) mb-2">
          {title}
        </div>
        {children}
      </div>
    </div>
  )
}
