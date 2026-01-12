"use client"

import Image from "next/image"

type UserInfo = {
  _id: string
  name: string
  profile_picture?: { url?: string } | null
}

const AVATAR_FALLBACK = "/avatar-placeholder.png"

export default function PostHeader({ user }: { user: UserInfo }) {
  const avatarSrc = user?.profile_picture?.url || AVATAR_FALLBACK

  return (
    <div className="px-4 pt-5 pb-2">
      <div className="flex items-start gap-4">
        <Image
          src={avatarSrc}
          alt={user?.name || "User"}
          width={48}
          height={48}
          className="h-12 w-12 rounded-sm object-cover"
        />
        <div className="flex-1 pt-1">
          <h3 className="font-bold text-(--dk-ink)">{user?.name}</h3>
          <p className="text-sm text-(--dk-slate)">@{user?.name}</p>
        </div>
      </div>
    </div>
  )
}
