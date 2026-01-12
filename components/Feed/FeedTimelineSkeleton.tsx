"use client"

export default function FeedTimelineSkeleton() {
  return (
    <div className="py-8 px-4 space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-start gap-4 mb-4">
            <div className="h-12 w-12 rounded-sm bg-(--dk-mist)" />
            <div className="flex-1 pt-2 space-y-2">
              <div className="h-4 w-40 bg-(--dk-mist) rounded" />
              <div className="h-3 w-28 bg-(--dk-mist) rounded" />
            </div>
          </div>

          <div className="ml-8 space-y-3">
            <div className="h-20 bg-(--dk-mist) rounded-xl" />
            <div className="h-20 bg-(--dk-mist) rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
