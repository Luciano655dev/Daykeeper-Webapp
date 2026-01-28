"use client"

import { useMemo, useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import FeedPostMediaStrip from "@/components/Feed/FeedPostMediaStrip"
import { apiFetch } from "@/lib/authClient"
import type { FeedPost } from "@/lib/feedTypes"
import { API_URL } from "@/config"
import RichText from "@/components/common/RichText"

type Props = {
  post: FeedPost
}

export default function PostDetailCard({ post }: Props) {
  // like state
  const [liked, setLiked] = useState(!!post.userLiked)
  const [likesCount, setLikesCount] = useState<number>(post.likes ?? 0)
  const [likeBusy, setLikeBusy] = useState(false)

  const postId = useMemo(() => post.id, [post.id])

  async function toggleLike(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (likeBusy) return

    const prevLiked = liked
    const prevCount = likesCount

    const nextLiked = !prevLiked
    setLiked(nextLiked)
    setLikesCount((c) =>
      nextLiked ? (Number.isFinite(c) ? c + 1 : 1) : Math.max(0, (c ?? 0) - 1),
    )

    setLikeBusy(true)

    try {
      const res = await apiFetch(`${API_URL}/post/${postId}/like`, {
        method: "POST",
        cache: "no-store",
      })
      if (!res.ok) throw new Error()
    } catch {
      setLiked(prevLiked)
      setLikesCount(prevCount)
    } finally {
      setLikeBusy(false)
    }
  }

  return (
    <article className="bg-(--dk-paper) border-b border-(--dk-ink)/10">
      <div className="px-4 pb-2">
        {/* content */}
        <div className="mt-3">
          <p className="text-(--dk-ink) text-[17px] leading-relaxed whitespace-pre-wrap">
            <RichText text={String(post.content || "")} />
          </p>

          <FeedPostMediaStrip media={post.media} />
        </div>

        {/* actions */}
        <div className="mt-4 pt-3 border-t border-(--dk-ink)/10 flex items-center gap-6 text-(--dk-slate)">
          <button
            onClick={toggleLike}
            disabled={likeBusy}
            className={`flex items-center gap-2 text-sm transition disabled:opacity-60 ${
              liked ? "text-(--dk-sky)" : "hover:text-(--dk-sky)"
            }`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
            <span className="font-medium">{likesCount}</span>
          </button>

          <button className="flex items-center gap-2 text-sm hover:text-(--dk-sky) transition">
            <MessageCircle size={16} />
            <span className="font-medium">{post.comments ?? 0}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
