"use client"

import { useCallback, useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"

export type BlockedUserItem = {
  _id: string
  blockedId?: string
  username?: string
  displayName?: string
  bio?: string
  profile_picture?: { url?: string } | null
}

type BlocksResponse = {
  message?: string
  data?: BlockedUserItem[]
  page?: number
  pageSize?: number
  maxPageSize?: number
  totalPages?: number
  totalCount?: number
}

const PAGE_SIZE = 20

async function fetchBlocksPage(page: number): Promise<BlocksResponse> {
  const qs = new URLSearchParams({
    page: String(page),
    maxPageSize: String(PAGE_SIZE),
  })

  const res = await apiFetch(`${API_URL}/blocks?${qs.toString()}`, {
    method: "GET",
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || `Request failed (${res.status})`)
  }

  return (await res.json().catch(() => ({}))) as BlocksResponse
}

export function useBlocks() {
  const q = useInfiniteQuery({
    queryKey: ["blocks"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchBlocksPage(Number(pageParam)),
    getNextPageParam: (lastPage) => {
      const page = lastPage?.page ?? 1
      const totalPages = lastPage?.totalPages
      const count = Array.isArray(lastPage?.data) ? lastPage!.data!.length : 0

      if (typeof totalPages === "number") {
        return page < totalPages ? page + 1 : undefined
      }

      return count < PAGE_SIZE ? undefined : page + 1
    },
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

  const totalCount = q.data?.pages?.[0]?.totalCount ?? 0

  return {
    items,
    loading: q.isLoading,
    loadingMore: q.isFetchingNextPage,
    error: q.error ? (q.error as any).message : null,
    hasMore: !!q.hasNextPage,
    loadMore,
    reload,
    totalCount,
  }
}
