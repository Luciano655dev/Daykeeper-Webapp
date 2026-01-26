"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/queryClient"
import { UploadQueueProvider } from "@/lib/uploadQueue"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UploadQueueProvider>{children}</UploadQueueProvider>
    </QueryClientProvider>
  )
}
