"use client"

import { useQuery } from "@tanstack/react-query"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"

type ApiOk<T> = { message?: string; data: T }

export type NotePrivacy = "public" | "close friends" | "private"

export type ApiNoteDetail = {
  _id: string
  user: string
  date?: string
  dateLocal?: string
  text: string
  privacy: NotePrivacy
  user_info?: {
    _id?: string
    username?: string
    displayName?: string
    profile_picture?: { url?: string }
  }
}

async function readJsonSafe<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

async function fetchNoteDetail(noteId: string) {
  const url = `${API_URL}/day/note/${encodeURIComponent(noteId)}`
  const res = await apiFetch(url, { method: "GET" })
  const json = await readJsonSafe<ApiOk<ApiNoteDetail>>(res)

  if (!res.ok) {
    const msg =
      (json as any)?.message ||
      (json as any)?.error ||
      `Request failed (${res.status})`
    throw new Error(msg)
  }

  if (!json?.data) throw new Error("Invalid server response.")
  return json.data
}

export function useNoteDetail(noteId: string | null) {
  return useQuery({
    queryKey: ["noteDetail", noteId],
    enabled: !!noteId,
    queryFn: () => fetchNoteDetail(String(noteId)),
    staleTime: 30_000,
  })
}
