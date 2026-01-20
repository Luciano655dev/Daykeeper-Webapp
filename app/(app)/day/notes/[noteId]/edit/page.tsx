"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"

import { useNoteDetail } from "@/hooks/useNoteDetail"

import FormAlert from "@/components/Form/FormAlert"
import PrivacyPicker, {
  type PrivacyValue,
} from "@/components/common/PrivacyPicker"

type ApiOk<T> = { message?: string; data?: T }

type Privacy = PrivacyValue // "public" | "private" | "close friends"

function safeApiMessage(err: any) {
  try {
    const parsed = JSON.parse(err?.message)
    const msg = parsed?.message

    if (typeof msg === "string") return msg

    if (msg && typeof msg === "object") {
      if (typeof msg.message === "string") return msg.message
      return JSON.stringify(msg)
    }

    return "Something went wrong."
  } catch {
    return err?.message ? String(err.message) : "Something went wrong."
  }
}

async function readJsonSafe<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

export default function EditNotePage() {
  const { noteId } = useParams<{ noteId: string }>()
  const router = useRouter()
  const qc = useQueryClient()

  const q = useNoteDetail(noteId)
  const loading = q.isLoading
  const error = q.error ? (q.error as any).message : null
  const note = q.data ?? null

  const [text, setText] = useState("")
  const [privacy, setPrivacy] = useState<Privacy>("public")

  const [busy, setBusy] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Initialize form when note arrives
  useEffect(() => {
    if (!note) return
    setText(String(note.text ?? ""))
    setPrivacy((note.privacy as Privacy) || "public")
  }, [note])

  const canSave = useMemo(() => {
    if (!note) return false
    const t = text.trim()
    if (!t.length) return false

    const changed =
      t !== String(note.text ?? "").trim() || privacy !== note.privacy

    return changed && !busy
  }, [note, text, privacy, busy])

  async function onSave() {
    if (!note) return
    if (busy) return

    setBusy(true)
    setFormError(null)

    try {
      const payload = {
        text: text.trim(),
        privacy,
      }

      const res = await apiFetch(
        `${API_URL}/day/note/${encodeURIComponent(String(noteId))}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          cache: "no-store",
        },
      )

      const data = await readJsonSafe<ApiOk<any>>(res)

      if (!res.ok) {
        const msg = data?.message || "Could not update note."
        throw new Error(JSON.stringify({ message: msg }))
      }

      // Update detail cache so it refreshes immediately
      qc.setQueryData(["noteDetail", noteId], (old: any) => {
        if (!old) return old
        return { ...old, text: payload.text, privacy: payload.privacy }
      })

      // Refresh day lists if your notes appear there
      qc.invalidateQueries({ queryKey: ["userDay"] })

      router.push(`/day/notes/${noteId}`)
      router.refresh()
    } catch (err: any) {
      setFormError(String(safeApiMessage(err)))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 bg-(--dk-paper) min-h-screen">
        {/* Sticky top header */}
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-(--dk-mist) transition"
              aria-label="Back"
              disabled={busy}
            >
              <ArrowLeft size={18} className="text-(--dk-ink)" />
            </button>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Edit note
              </div>
              <div className="text-xs text-(--dk-slate)">Update</div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="px-4 py-6 text-sm text-(--dk-slate)">Loading…</div>
        )}

        {!loading && error && (
          <div className="px-4 py-6 text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && note && (
          <div className="px-4 py-4 space-y-4">
            {formError ? (
              <FormAlert type="error">Could not save</FormAlert>
            ) : null}

            <div className="space-y-2">
              <div className="text-xs font-medium text-(--dk-slate)">Note</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Write your note…"
                className={[
                  "w-full rounded-xl border border-(--dk-ink)/10 bg-(--dk-paper)",
                  "px-3 py-2 text-sm text-(--dk-ink)",
                  "focus:outline-none focus:ring-2 focus:ring-(--dk-sky)/40",
                ].join(" ")}
              />
              <div className="text-xs text-(--dk-slate)">
                {text.trim().length} characters
              </div>
            </div>

            <PrivacyPicker
              value={privacy}
              onChange={(v) => {
                if (busy) return
                setPrivacy(v)
              }}
            />

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={busy}
                className="px-3 py-2 rounded-xl border border-(--dk-ink)/10 hover:bg-(--dk-ink)/5 text-sm transition disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onSave}
                disabled={!canSave}
                className="px-3 py-2 rounded-xl bg-(--dk-sky) text-white text-sm hover:opacity-95 transition disabled:opacity-60"
              >
                {busy ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
