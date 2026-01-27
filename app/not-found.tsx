import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-(--dk-paper)">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 min-h-screen">
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md z-20">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3 flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-(--dk-mist) transition"
              aria-label="Back"
            >
              <ArrowLeft size={18} className="text-(--dk-ink)" />
            </Link>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Page not found
              </div>
              <div className="text-xs text-(--dk-slate)">404</div>
            </div>
          </div>
        </div>

        <section className="px-6 py-16 text-center">
          <div className="mx-auto max-w-sm">
            <div className="text-[72px] font-black leading-none text-(--dk-sky)">
              404
            </div>
            <h1 className="mt-2 text-2xl font-bold text-(--dk-ink)">
              We couldn’t find that page
            </h1>
            <p className="mt-2 text-sm text-(--dk-slate)">
              The page you’re looking for doesn’t exist, or the link is no
              longer available.
            </p>

            <div className="mt-8 grid gap-3">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-(--dk-sky) text-white font-semibold py-3 transition hover:opacity-95"
              >
                <Home size={16} />
                Go home
              </Link>

              <Link
                href="/search"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-(--dk-ink)/10 bg-(--dk-paper) text-(--dk-ink) font-semibold py-3 transition hover:bg-(--dk-mist)"
              >
                <Search size={16} />
                Search
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
