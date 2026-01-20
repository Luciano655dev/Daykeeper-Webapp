"use client"

import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { StickyNote, Clock, Pencil, Trash2, Flag, Ban } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

import { useNoteDetail } from "@/hooks/useNoteDetail"
import { useMe } from "@/lib/useMe"

import UserDayListRow from "@/components/UserDay/UserDayListRow"
import ContentHeader from "@/components/common/ContentHeader"
import PrivacyChip from "@/components/common/PrivacyChip"
import DeleteEntityModal from "@/components/common/DeleteEntityModal"

function formatTime(s?: string) {
  if (!s) return ""
  const d = new Date(s)
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function NotePage() {
  const { noteId } = useParams<{ noteId: string }>()
  const router = useRouter()
  const qc = useQueryClient()

  const q = useNoteDetail(noteId)
  const me = useMe()

  const loading = q.isLoading
  const error = q.error ? (q.error as any).message : null
  const note = q.data ?? null

  const user = note?.user_info ?? null
  const stamp = useMemo(
    () => formatTime(note?.dateLocal || note?.date),
    [note?.dateLocal, note?.date],
  )

  const isOwner =
    !!me?._id && !!note?.user && String(me._id) === String(note.user)

  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <main className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 bg-(--dk-paper) min-h-screen">
        {/* Sticky top header (same shell as PostPage) */}
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-(--dk-mist) transition"
              aria-label="Back"
            >
              {/* keeping your pattern: lucide icon inline without extra imports */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-(--dk-ink)"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-(--dk-ink)">Note</div>
              <div className="text-xs text-(--dk-slate)">Details</div>
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
          <div className="px-4 py-4 space-y-3">
            <ContentHeader
              user={user}
              stamp={stamp}
              privacy={note.privacy}
              menuItems={
                isOwner
                  ? [
                      {
                        key: "edit",
                        label: "Edit note",
                        icon: <Pencil size={16} />,
                        onClick: () =>
                          router.push(`/day/notes/${note._id}/edit`),
                      },
                      {
                        key: "delete",
                        label: "Delete note",
                        icon: <Trash2 size={16} />,
                        variant: "danger",
                        onClick: () => setDeleteOpen(true),
                      },
                    ]
                  : [
                      {
                        key: "report",
                        label: "Report note",
                        icon: <Flag size={16} />,
                        onClick: () =>
                          router.push(
                            `/report?user=${encodeURIComponent(
                              String(user?._id || ""),
                            )}&note=${encodeURIComponent(note._id)}`,
                          ),
                      },
                      {
                        key: "block",
                        label: "Block user",
                        icon: <Ban size={16} />,
                        variant: "danger",
                        onClick: () =>
                          router.push(
                            `/block?user=${encodeURIComponent(
                              String(user?._id || ""),
                            )}`,
                          ),
                      },
                    ]
              }
            />

            {/* NOTE CONTENT (standalone view, using same row style as UserDay) */}
            <UserDayListRow
              leftIcon={<StickyNote size={18} />}
              title={
                <span className="whitespace-pre-wrap text-sm leading-6">
                  {note.text}
                </span>
              }
              metaTop={
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {stamp}
                  </span>
                  <PrivacyChip privacy={note.privacy} />
                </span>
              }
            />

            {/* Generic delete modal */}
            <DeleteEntityModal
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}
              onDeleted={() => {
                qc.removeQueries({ queryKey: ["noteDetail", noteId] })
                // Optional: invalidate user-day caches if you want notes list to refresh elsewhere
                // qc.invalidateQueries({ queryKey: ["userDay"] })

                router.back()
              }}
              entityLabel="note"
              entityId={String(note._id)}
              buildPath={({ id }) => `/day/note/${encodeURIComponent(id)}`}
              confirmTitle="Delete note"
              confirmButtonText="Delete note"
              successTitle="Note deleted"
            />
          </div>
        )}
      </div>
    </main>
  )
}
