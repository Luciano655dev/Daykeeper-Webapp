"use client"

import { useEffect, useRef } from "react"
import CommentItem from "./CommentItem"
import { usePostComments } from "@/hooks/usePostComments"

export default function CommentsSection({ postId }: { postId: string }) {
  const { items, loading, loadingMore, error, hasMore, loadMore, reload } =
    usePostComments(postId)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // refs to avoid recreating observer all the time
  const hasMoreRef = useRef(hasMore)
  const loadingRef = useRef(loading)
  const loadingMoreRef = useRef(loadingMore)

  useEffect(() => {
    hasMoreRef.current = hasMore
    loadingRef.current = loading
    loadingMoreRef.current = loadingMore
  }, [hasMore, loading, loadingMore])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return

        if (!hasMoreRef.current) return
        if (loadingRef.current) return
        if (loadingMoreRef.current) return

        loadMore()
      },
      { root: null, rootMargin: "600px", threshold: 0 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [loadMore])

  return (
    <section className="border-t border-(--dk-ink)/10">
      <div className="px-4 py-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-(--dk-ink)">Comments</h2>

        {error ? (
          <button
            onClick={reload}
            className="text-xs underline text-(--dk-slate) hover:text-(--dk-ink)"
          >
            Retry
          </button>
        ) : null}
      </div>

      {loading && (
        <div className="px-4 pb-6 text-sm text-(--dk-slate)">
          Loading comments…
        </div>
      )}

      {!loading && items.length === 0 && !error && (
        <div className="px-4 pb-6 text-sm text-(--dk-slate)">
          No comments yet.
        </div>
      )}

      {items.map((c, idx) => (
        <CommentItem
          key={`${c.user?._id || "u"}-${c.created_at}-${idx}`}
          c={c}
        />
      ))}

      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-px w-full" />

      {loadingMore && (
        <div className="px-4 py-4 text-sm text-(--dk-slate)">Loading more…</div>
      )}

      {!loading && !loadingMore && !hasMore && items.length > 0 && (
        <div className="px-4 py-6 text-xs text-(--dk-slate)/80 text-center">
          You’re all caught up.
        </div>
      )}
    </section>
  )
}
