import Image from "next/image"

export default function ProfileHeader({ user }: { user: any }) {
  const avatar = user.profile_picture?.url || "/avatar-placeholder.png"

  return (
    <header className="flex flex-col gap-6 rounded-3xl border bg-white p-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border bg-slate-50">
          <Image
            src={avatar}
            alt={user.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">{user.name}</h1>

          {user.bio ? (
            <p className="mt-2 max-w-xl text-sm text-slate-700">{user.bio}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No bio yet.</p>
          )}

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
            <span>
              <b className="text-slate-900">{user.followers}</b> followers
            </span>
            <span>
              <b className="text-slate-900">{user.following}</b> following
            </span>

            {user.currentStreak !== undefined && (
              <span>
                <b className="text-slate-900">{user.currentStreak}</b> current
                streak
              </span>
            )}

            {user.maxStreak !== undefined && (
              <span>
                <b className="text-slate-900">{user.maxStreak}</b> max streak
              </span>
            )}
          </div>

          {user.private && (
            <p className="mt-3 text-xs font-medium text-slate-500">
              Private profile
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          {user.isFollowing ? "Following" : "Follow"}
        </button>
      </div>
    </header>
  )
}
