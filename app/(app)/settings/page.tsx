"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  Ban,
  Lock,
  LogOut,
  Monitor,
  Moon,
  Shield,
  Smartphone,
  Sun,
  Users,
} from "lucide-react"

import LogoutButton from "./LogoutButton"
import { getTheme, setTheme, type ThemeMode } from "@/lib/theme"
import { apiFetch } from "@/lib/authClient"
import { API_URL } from "@/config"
import FormAlert from "@/components/Form/FormAlert"

function SectionBlock({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-(--dk-ink)/10 bg-(--dk-paper)">
      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-(--dk-ink)">{title}</div>
        {subtitle ? (
          <div className="text-xs text-(--dk-slate)">{subtitle}</div>
        ) : null}
      </div>
      <div className="divide-y divide-(--dk-ink)/10 border-t border-(--dk-ink)/10">
        {children}
      </div>
    </section>
  )
}

function SettingsRow({
  title,
  subtitle,
  href,
  icon,
}: {
  title: string
  subtitle?: string
  href: string
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-4 hover:bg-(--dk-sky)/8 transition"
    >
      <div className="h-9 w-9 rounded-xl bg-(--dk-sky)/15 text-(--dk-ink) flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-(--dk-ink)">{title}</div>
        {subtitle ? (
          <div className="text-xs text-(--dk-slate)">{subtitle}</div>
        ) : null}
      </div>
      <ArrowRight size={16} className="text-(--dk-slate)" />
    </Link>
  )
}

export default function SettingsPage() {
  const [mode, setMode] = useState<ThemeMode>("system")
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null)

  useEffect(() => setMode(getTheme()), [])

  const canDelete = useMemo(
    () => deleteConfirm.trim().toLowerCase() === "delete",
    [deleteConfirm]
  )

  async function onDeleteAccount() {
    if (!canDelete || deleteLoading) return
    setDeleteLoading(true)
    setDeleteError(null)
    setDeleteSuccess(null)

    try {
      const res = await apiFetch(`${API_URL}/user`, { method: "DELETE" })
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || "Failed to delete account")
      }

      setDeleteSuccess("Account deleted. Redirecting to login...")
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/login"
    } catch (e: any) {
      setDeleteError(e?.message || "Failed to delete account")
    } finally {
      setDeleteLoading(false)
    }
  }

  return (
    <main className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 bg-(--dk-paper) min-h-screen">
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md z-20">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3">
            <div className="text-sm font-semibold text-(--dk-ink)">
              Settings
            </div>
            <div className="text-xs text-(--dk-slate)">
              Configure your account, privacy, and appearance.
            </div>
          </div>
        </div>

        <div className="pb-8">
          <SectionBlock
            title="Account"
            subtitle="Security, privacy, and connections"
          >
            <SettingsRow
              title="Change password"
              subtitle="Update your login credentials"
              href="/settings/change-password"
              icon={<Lock size={18} />}
            />
            <SettingsRow
              title="Privacy"
              subtitle="Public or private account"
              href="/settings/privacy"
              icon={<Shield size={18} />}
            />
            <SettingsRow
              title="Close friends"
              subtitle="Manage who sees close-friends posts"
              href="/settings/close-friends"
              icon={<Users size={18} />}
            />
            <SettingsRow
              title="Blocks"
              subtitle="Blocked users and content"
              href="/settings/blocks"
              icon={<Ban size={18} />}
            />
            <SettingsRow
              title="Devices"
              subtitle="Active sessions and device tokens"
              href="/settings/devices"
              icon={<Smartphone size={18} />}
            />
          </SectionBlock>

          <SectionBlock title="Appearance" subtitle="Theme preferences">
            <div className="px-4 py-4">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Theme
              </div>
              <div className="text-xs text-(--dk-slate)">
                Choose how Daykeeper looks on this device.
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {(["light", "dark", "system"] as ThemeMode[]).map((m) => {
                  const active = mode === m
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMode(m)
                        setTheme(m)
                      }}
                      className={[
                        "px-3 py-2 rounded-xl border text-sm font-medium transition",
                        "border-(--dk-ink)/10 text-(--dk-ink)",
                        active
                          ? "bg-(--dk-sky)/20 border-(--dk-sky)"
                          : "bg-(--dk-paper) hover:bg-(--dk-mist)",
                      ].join(" ")}
                    >
                      <span className="inline-flex items-center gap-2">
                        {m === "light" ? (
                          <Sun size={16} />
                        ) : m === "dark" ? (
                          <Moon size={16} />
                        ) : (
                          <Monitor size={16} />
                        )}
                        {m}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </SectionBlock>

          <SectionBlock
            title="Danger zone"
            subtitle="Irreversible actions"
          >
            <div className="px-4 py-4">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Delete account
              </div>
              <div className="text-xs text-(--dk-slate)">
                This permanently removes your account, posts, and data.
              </div>

              <div className="mt-3 space-y-3">
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder='Type "DELETE" to confirm'
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition bg-(--dk-paper) border-(--dk-ink)/10 focus:border-(--dk-sky) text-(--dk-ink)"
                />

                <button
                  type="button"
                  onClick={onDeleteAccount}
                  disabled={!canDelete || deleteLoading}
                  className="w-full rounded-xl px-4 py-3 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: "#FEE2E2",
                    color: "#991B1B",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                  }}
                >
                  {deleteLoading ? "Deleting..." : "Delete account"}
                </button>

                {deleteError ? <FormAlert>{deleteError}</FormAlert> : null}
                {deleteSuccess ? (
                  <FormAlert type="success">{deleteSuccess}</FormAlert>
                ) : null}
              </div>
            </div>

            <div className="px-4 py-4 border-t border-(--dk-ink)/10">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Logout
              </div>
              <div className="text-xs text-(--dk-slate)">
                End your current session on this device.
              </div>
              <div className="mt-3">
                <LogoutButton className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium bg-(--dk-sky) text-white hover:brightness-95 transition w-full sm:w-auto">
                  <LogOut size={16} /> Logout
                </LogoutButton>
              </div>
            </div>
          </SectionBlock>
        </div>
      </div>
    </main>
  )
}
