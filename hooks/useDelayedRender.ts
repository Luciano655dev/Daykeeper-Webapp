"use client"

import { useEffect, useState } from "react"

export function useDelayedRender(delay = 200) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return show
}
