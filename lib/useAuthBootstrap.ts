"use client"

import { useEffect, useState } from "react"
import { authClient, refreshAccessToken } from "@/lib/authClient"

export function useAuthBootstrap() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        if (!authClient.getAccessToken()) {
          await refreshAccessToken()
        }
      } finally {
        if (alive) setReady(true)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  return { ready }
}
