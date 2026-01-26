"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck, ShieldOff } from "lucide-react"

import FormAlert from "@/components/Form/FormAlert"
import FormButton from "@/components/Form/FormButton"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"

type PrivacyMode = "public" | "private"

type AuthUserResponse = {
  user?: {
    private?: boolean
  }
}

export default function PrivacyPage() {
  const router = useRouter()
  const [mode, setMode] = useState<PrivacyMode>("public")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    let alive = true

    async function load() {
      try {
        const res = await apiFetch(`${API_URL}/auth/user`, { method: "GET" })
        if (!res.ok) return
        const json = (await res.json().catch(() => null)) as AuthUserResponse
        const next = json?.user?.private
        if (alive && typeof next === "boolean") {
          setMode(next ? "private" : "public")
        }
      } catch {}
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  const helperText = useMemo(() => {
    return mode === "public"
      ? "Public: anyone can see your profile and posts."
      : "Private: only approved followers can see your posts and activity."
  }, [mode])

  async function onSave() {
    if (loading) return
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const fd = new FormData()
      fd.append("private", String(mode === "private"))

      const res = await apiFetch(`${API_URL}/user`, {
        method: "PUT",
        body: fd,
      })

      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || "Failed to update privacy")
      }

      setSuccess("Privacy updated successfully.")
    } catch (e: any) {
      setError(e?.message || "Failed to update privacy")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 bg-(--dk-paper) min-h-screen">
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md z-20">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-(--dk-mist) transition"
              aria-label="Back"
            >
              <ArrowLeft size={18} className="text-(--dk-ink)" />
            </button>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Privacy
              </div>
              <div className="text-xs text-(--dk-slate)">
                Choose who can see your activity.
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8">
          <div className="px-4 pt-6">
            {error ? <FormAlert>{error}</FormAlert> : null}
            {success ? <FormAlert type="success">{success}</FormAlert> : null}
          </div>

          <section className="border-t border-(--dk-ink)/10">
            <div className="px-4 py-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-(--dk-sky)/20 flex items-center justify-center text-(--dk-ink)">
                {mode === "public" ? (
                  <ShieldCheck size={18} />
                ) : (
                  <ShieldOff size={18} />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-(--dk-ink)">
                  Account visibility
                </div>
                <div className="text-xs text-(--dk-slate)">{helperText}</div>
              </div>
            </div>

            <div className="border-t border-(--dk-ink)/10">
              <label className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-(--dk-sky)/8 transition">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={mode === "public"}
                  onChange={() => setMode("public")}
                />
                <div>
                  <div className="text-sm font-semibold text-(--dk-ink)">
                    Public
                  </div>
                  <div className="text-xs text-(--dk-slate)">
                    Anyone can see your posts and profile.
                  </div>
                </div>
              </label>
            </div>

            <div className="border-t border-(--dk-ink)/10">
              <label className="flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-(--dk-sky)/8 transition">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={mode === "private"}
                  onChange={() => setMode("private")}
                />
                <div>
                  <div className="text-sm font-semibold text-(--dk-ink)">
                    Private
                  </div>
                  <div className="text-xs text-(--dk-slate)">
                    Only approved followers can see your posts.
                  </div>
                </div>
              </label>
            </div>
          </section>

          <div className="px-4 pt-4 text-xs text-(--dk-slate)">
            Changing this setting will affect how others can view your profile
            and future posts.
          </div>

          <div className="px-4 pt-4">
            <FormButton type="button" onClick={onSave} disabled={loading}>
            {loading ? "Saving..." : "Save privacy"}
            </FormButton>
          </div>
        </div>
      </div>
    </main>
  )
}
