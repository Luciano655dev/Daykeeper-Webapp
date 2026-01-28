"use client"

import { useEffect, useState } from "react"
import { authClient, refreshAccessToken, logoutClient } from "@/lib/authClient"

export function useAuthBootstrap() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    let aborted = false

    ;(async () => {
      try {
        if (!authClient.getAccessToken()) {
          const refreshed = await refreshAccessToken()
          if (!refreshed) {
            await logoutClient("Session expired")
            aborted = true
            return
          }
        }
      } finally {
        if (alive && !aborted) setReady(true)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  return { ready }
}
