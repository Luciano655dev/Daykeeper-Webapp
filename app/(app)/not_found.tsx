import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--dk-paper) px-6">
      <div className="w-full max-w-md text-center">
        {/* 404 */}
        <div className="text-[96px] font-black leading-none text-(--dk-sky)">
          404
        </div>

        {/* Title */}
        <h1 className="mt-2 text-2xl font-bold text-(--dk-ink)">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-2 text-sm text-(--dk-slate)">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg bg-(--dk-sky) text-white font-semibold transition hover:opacity-95"
          >
            Go home
          </Link>

          <Link
            href="/search"
            className="px-5 py-2.5 rounded-lg border border-(--dk-ink)/10 bg-(--dk-paper) text-(--dk-ink) font-semibold transition hover:bg-(--dk-mist)"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  )
}
