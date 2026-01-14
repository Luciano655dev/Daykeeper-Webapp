"use client"

import { useCallback, useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"

export type PostComment = {
  user: {
    _id: string
    username: string
    profile_picture?: { url?: string } | null
    timeZone?: string | null
  }
  comment: string
  created_at: string
}

type CommentsResponse = {
  data?: PostComment[]
  page?: number
  totalPages?: number
}

const PAGE_SIZE = 10

async function fetchCommentsPage(
  postId: string,
  page: number
): Promise<CommentsResponse> {
  const qs = new URLSearchParams({
    page: String(page),
    maxPageSize: String(PAGE_SIZE),
  })

  const res = await apiFetch(
    `${API_URL}/post/${postId}/comments?${qs.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed (${res.status})`)
  }

  return (await res.json().catch(() => ({}))) as CommentsResponse
}

export function usePostComments(postId: string | undefined) {
  const q = useInfiniteQuery({
    queryKey: ["postComments", postId],
    enabled: !!postId,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchCommentsPage(String(postId), Number(pageParam)),

    getNextPageParam: (lastPage) => {
      const page = lastPage?.page ?? 1
      const totalPages = lastPage?.totalPages
      const count = Array.isArray(lastPage?.data) ? lastPage!.data!.length : 0

      // If API gives totalPages, trust it
      if (typeof totalPages === "number") {
        return page < totalPages ? page + 1 : undefined
      }

      // If totalPages is missing, stop when the server returns less than PAGE_SIZE
      return count < PAGE_SIZE ? undefined : page + 1
    },

    // optional but helps reduce UI thrash
    refetchOnWindowFocus: false,
  })

  const items = useMemo(() => {
    const pages = q.data?.pages ?? []
    return pages.flatMap((p) => (Array.isArray(p?.data) ? p.data : []))
  }, [q.data])

  const loadMore = useCallback(() => {
    // super strict guard
    if (!q.hasNextPage) return
    if (q.isFetching || q.isFetchingNextPage) return
    q.fetchNextPage()
  }, [q])

  const reload = useCallback(() => {
    q.refetch()
  }, [q])

  return {
    items,
    loading: q.isLoading,
    loadingMore: q.isFetchingNextPage,
    error: q.error ? (q.error as any).message : null,
    hasMore: !!q.hasNextPage,
    loadMore,
    reload,
  }
}
