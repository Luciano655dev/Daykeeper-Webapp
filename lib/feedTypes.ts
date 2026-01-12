export type FeedUserDay = {
  userId: string
  userName: string
  userHandle: string
  profile_picture?: { url?: string } | null
  posts: FeedPost[]
}

export type FeedMedia = {
  _id: string
  type: "image" | "video" | string
  url: string
  name?: string
}

export type FeedPost = {
  id: string
  time?: string
  date?: string
  content: string

  media?: FeedMedia[]

  emotion?: number
  likes?: number
  comments?: number
  userLiked?: boolean
  userCommented?: any
}

export function normalizeFeedPayload(json: any): FeedUserDay[] {
  const list =
    json?.data?.response?.data ?? json?.response?.data ?? json?.data ?? []

  if (!Array.isArray(list)) return []

  return list.map((u: any) => ({
    user_info: u.user_info,
    postsCount: u.postsCount,
    eventsCount: u.eventsCount,
    notesCount: u.notesCount,
    tasksCount: u.tasksCount,
    lastPostTime: u.lastPostTime,
    userId: String(u.userId ?? u._id ?? ""),
    userName: String(u.userName ?? u.user?.name ?? u.name ?? ""),
    userHandle: String(
      u.userHandle ?? u.handle ?? u.username ?? u.userName ?? ""
    ),
    profile_picture: u.profile_picture ?? u.user?.profile_picture ?? null,
    posts: Array.isArray(u.posts)
      ? u.posts.map((p: any) => ({
          id: String(p.id ?? p._id ?? ""),
          time: p.time,
          date: p.date,
          content: String(p.content ?? p.data ?? ""),
          emotion: p.emotion,
          media: Array.isArray(p.media)
            ? p.media.map((m: any) => ({
                _id: String(m._id ?? ""),
                type: m.type,
                url: m.url,
                name: m.name,
              }))
            : [],

          likes: p.likes,
          comments: p.comments,
          userLiked: p.userLiked,
          userCommented: p.userCommented,
        }))
      : [],
  }))
}
