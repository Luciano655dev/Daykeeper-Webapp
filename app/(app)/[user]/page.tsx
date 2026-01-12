"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, notFound } from "next/navigation"

import { apiFetch } from "@/lib/authClient"
import ProfileHeader from "@/components/profile/ProfileHeader"

type ApiUser = {
  _id: string
  name: string
  email?: string
  bio?: string
  private?: boolean
  profile_picture?: { url?: string }
  created_at?: string
  timeZone?: string
  maxStreak?: number
  currentStreak?: number
  followers?: number
  following?: number
  isFollowing?: boolean
  roles?: string[]
}

function normalizeUsername(param: unknown) {
  const raw = Array.isArray(param) ? param[0] : param
  if (typeof raw !== "string") return null
  const clean = raw.replace(/^@/, "").trim()
  return clean.length ? clean : null
}

export default function UserPage({ callNotFound }: any) {
  const params = useParams()

  const username: any = useMemo(
    () => normalizeUsername((params as any)?.user),
    [params]
  )

  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      setError("Missing username in route.")
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    async function load() {
      try {
        const res = await apiFetch(
          `http://localhost:3001/${encodeURIComponent(username)}`
        )

        const json = await res.json().catch(() => null)
        if (!res.ok || res.status != 200) {
          ;("use server")
          setError(json?.message || "Failed to fetch user")
          return notFound()
        }

        if (!cancelled) setUser(json?.data ?? null)
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Something went wrong")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [username])

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border bg-white p-6 text-slate-500">
          Loading profile…
        </div>
      </main>
    )
  }

  if (!user || error) return notFound()

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <ProfileHeader user={user} />
    </main>
  )
}
