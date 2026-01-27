"use client"

import { useCallback, useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"
import type { PostComment } from "@/hooks/usePostComments"

type RepliesResponse = {
  data?: PostComment[]
  page?: number
  totalPages?: number
}

const PAGE_SIZE = 10

async function fetchRepliesPage(
  commentId: string,
  page: number
): Promise<RepliesResponse> {
  const qs = new URLSearchParams({
    page: String(page),
    maxPageSize: String(PAGE_SIZE),
  })

  const res = await apiFetch(
    `${API_URL}/post/comment/${commentId}/replies?${qs.toString()}`,
    { method: "GET", cache: "no-store" }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed (${res.status})`)
  }

  return (await res.json().catch(() => ({}))) as RepliesResponse
}

export function useCommentReplies(commentId: string | undefined, enabled = true) {
  const q = useInfiniteQuery({
    queryKey: ["commentReplies", commentId],
    enabled: !!commentId && enabled,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchRepliesPage(String(commentId), Number(pageParam)),
    getNextPageParam: (lastPage) => {
      const page = lastPage?.page ?? 1
      const totalPages = lastPage?.totalPages
      const count = Array.isArray(lastPage?.data) ? lastPage!.data!.length : 0

      if (typeof totalPages === "number") {
        return page < totalPages ? page + 1 : undefined
      }

      return count < PAGE_SIZE ? undefined : page + 1
    },
    refetchOnWindowFocus: false,
  })

  const items = useMemo(() => {
    const pages = q.data?.pages ?? []
    return pages.flatMap((p) => (Array.isArray(p?.data) ? p.data : []))
  }, [q.data])

  const loadMore = useCallback(() => {
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
