"use client"

import Image from "next/image"
import { Search } from "lucide-react"

export default function RightPanel() {
  const AVATAR = "/avatar-placeholder.png"

  return (
    <aside className="hidden lg:block fixed right-0 top-0 h-screen w-80 p-4 overflow-y-auto bg-(--dk-paper)">
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-(--dk-mist) rounded-xl p-3 flex items-center gap-3 border border-(--dk-ink)/10">
          <Search size={18} className="text-(--dk-sky)" />
          <input
            type="text"
            placeholder="Search Daykeeper"
            className="bg-transparent outline-none text-sm text-(--dk-ink) placeholder:text-(--dk-slate) flex-1"
          />
        </div>

        {/* Daily Summary */}
        <div className="bg-(--dk-paper) rounded-2xl border border-(--dk-ink)/10 p-4">
          <h2 className="font-bold text-(--dk-ink) text-lg mb-3">
            Today&apos;s Summary
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-(--dk-slate)">Total Posts</span>
              <span className="text-lg font-bold text-(--dk-sky)">8</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-(--dk-slate)">Active Users</span>
              <span className="text-lg font-bold text-(--dk-ink)">3</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-(--dk-slate)">Most Active</span>
              <span className="text-sm font-semibold text-(--dk-ink)">
                Emily Watson
              </span>
            </div>
          </div>
        </div>

        {/* Who to follow */}
        <div className="bg-(--dk-paper) rounded-2xl border border-(--dk-ink)/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-(--dk-ink)/10">
            <h2 className="font-bold text-(--dk-ink) text-lg">Who to follow</h2>
          </div>

          <div className="divide-y divide-(--dk-ink)/10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-center gap-3 transition cursor-pointer
                hover:bg-(--dk-mist)"
              >
                <Image
                  src={AVATAR}
                  alt="Suggested user"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-(--dk-ink) text-sm truncate">
                    Suggested User
                  </p>
                  <p className="text-(--dk-slate) text-xs truncate">
                    @suggested
                  </p>
                </div>

                <button className="px-4 py-1.5 bg-(--dk-sky) hover:opacity-95 text-white text-sm font-semibold rounded-full transition cursor-pointer">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
