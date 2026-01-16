"use client"

import Image from "next/image"
import { Camera, Trash2, Undo2 } from "lucide-react"

export default function AvatarPicker({
  fileRef,
  avatarSrc,
  avatarResetQueued,
  avatarFile,
  onPick,
  onChange,
  onReset,
  onUndo,
}: {
  fileRef: React.RefObject<HTMLInputElement | null>
  avatarSrc: string
  avatarResetQueued: boolean
  avatarFile: File | null
  onPick: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onReset: () => void
  onUndo: () => void
}) {
  const subtitle = avatarResetQueued
    ? "Will reset after you save."
    : avatarFile
    ? "Will upload after you save."
    : "Current profile picture."

  return (
    <section className="w-full">
      {/* Mobile-first: centered + bigger avatar */}
      <div className="flex flex-col items-center text-center gap-4">
        {/* Avatar */}
        <div className="w-full flex justify-center">
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 overflow-hidden rounded-3xl border border-(--dk-ink)/10 bg-(--dk-ink)/5 shadow-sm">
            <Image
              src={avatarSrc}
              alt="Profile picture"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              priority
            />
          </div>
        </div>

        {/* Actions */}
        <div className="w-full grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
          <button
            type="button"
            onClick={onPick}
            className="inline-flex w-full items-center justify-center gap-2 h-11 px-4 rounded-xl border border-(--dk-ink)/10 bg-(--dk-paper) text-sm font-medium text-(--dk-ink) hover:bg-(--dk-ink)/5 transition"
          >
            <Camera size={18} />
            Choose
          </button>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex w-full items-center justify-center gap-2 h-11 px-4 rounded-xl border border-(--dk-ink)/10 bg-(--dk-paper) text-sm font-medium text-(--dk-ink)/80 hover:bg-(--dk-ink)/5 transition"
          >
            <Trash2 size={18} />
            Reset
          </button>

          {(avatarFile || avatarResetQueued) && (
            <button
              type="button"
              onClick={onUndo}
              className="col-span-2 inline-flex w-full items-center justify-center gap-2 h-11 px-4 rounded-xl border border-(--dk-ink)/10 bg-(--dk-paper) text-sm font-medium text-(--dk-ink)/80 hover:bg-(--dk-ink)/5 transition sm:col-auto sm:w-auto"
            >
              <Undo2 size={18} />
              Undo
            </button>
          )}

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
        </div>

        {/* Tiny hint (optional) */}
        <div className="text-[11px] text-(--dk-slate)">
          PNG or JPG. Max 8MB.
        </div>
      </div>
    </section>
  )
}
