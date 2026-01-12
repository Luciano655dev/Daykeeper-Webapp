"use client"

import FeedPostItem from "@/components/Feed/FeedPostItem"

export default function UserDayPosts({ posts }: { posts: any[] }) {
  if (!posts?.length)
    return <div className="text-sm text-(--dk-slate)">No posts.</div>

  return (
    <div className="space-y-4">
      {posts.map((p: any, idx: number) => (
        <FeedPostItem
          key={p._id}
          post={{
            id: p._id,
            time: p.date,
            content: p.data,
            media: p.media,
            likes: p.likes,
            userLiked: p.userLiked,
            comments: p.comments,
            userCommented: !!p.userCommented && p.userCommented !== false,
          }}
          isLast={idx === posts.length - 1}
        />
      ))}
    </div>
  )
}
