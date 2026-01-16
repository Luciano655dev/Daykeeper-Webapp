"use client"

import { ArrowLeft } from "lucide-react"
import FormField from "@/components/Form/FormField"
import FormButton from "@/components/Form/FormButton"
import FormAlert from "@/components/Form/FormAlert"

import AvatarPicker from "@/components/User/Profile/AvatarPicker"
import TimeZonePicker from "@/components/User/Profile/TimeZonePicker"
import { TIME_ZONES } from "@/lib/utils/timezones"
import { useEditProfile } from "@/hooks/useEditProfile"

export default function EditProfileForm() {
  const p = useEditProfile()

  return (
    <main className="pb-20 lg:pb-0">
      <div className="max-w-2xl mx-auto border-x border-(--dk-ink)/10 bg-(--dk-paper) min-h-screen">
        <div className="sticky top-0 bg-(--dk-paper)/95 backdrop-blur-md z-10">
          <div className="h-1 w-full bg-(--dk-sky)/70" />
          <div className="px-4 py-3 flex items-center gap-3">
            <button
              onClick={p.goBack}
              className="p-2 rounded-lg hover:bg-(--dk-mist) transition"
              aria-label="Back"
              type="button"
            >
              <ArrowLeft size={18} className="text-(--dk-ink)" />
            </button>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-(--dk-ink)">
                Edit profile
              </div>
              <div className="text-xs text-(--dk-slate)">
                Update your public info
              </div>
            </div>
          </div>
        </div>

        {p.loading && (
          <div className="px-4 py-6 text-sm text-(--dk-slate)">Loading…</div>
        )}

        {!p.loading && p.error && (
          <div className="px-4 py-4">
            <FormAlert>{p.error}</FormAlert>
          </div>
        )}

        {!p.loading && p.success && (
          <div className="px-4 py-4">
            <div className="rounded-2xl border border-(--dk-sky)/20 bg-(--dk-sky)/10 px-4 py-3 text-sm text-(--dk-sky)">
              {p.success}
            </div>
          </div>
        )}

        {!p.loading && !p.error && (
          <form className="px-4 py-6 space-y-5" onSubmit={p.onSave}>
            <AvatarPicker
              fileRef={p.fileRef}
              avatarSrc={p.avatarSrc}
              avatarResetQueued={p.avatarResetQueued}
              avatarFile={p.avatarFile}
              onPick={p.pickAvatar}
              onChange={p.onAvatarChange}
              onReset={p.queueResetAvatar}
              onUndo={p.undoAvatarChange}
            />

            <div className="grid gap-4">
              <FormField
                label="Display name"
                maxLength={40}
                inputProps={{
                  type: "text",
                  autoComplete: "name",
                  placeholder: "How your name appears",
                  value: p.displayName,
                  onChange: (e: any) => p.setDisplayName(e.target.value),
                }}
              />

              <FormField
                label="Username"
                hint="Must be unique."
                maxLength={40}
                inputProps={{
                  type: "text",
                  autoComplete: "username",
                  placeholder: "yourhandle",
                  value: p.username,
                  onChange: (e: any) => p.setUsername(e.target.value),
                }}
              />

              <FormField
                label="Bio"
                maxLength={1000}
                inputProps={{
                  type: "text",
                  placeholder: "Write something about you",
                  value: p.bio,
                  onChange: (e: any) => p.setBio(e.target.value),
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-(--dk-ink)">
                Time zone
              </div>

              <TimeZonePicker
                value={p.timeZone}
                onChange={p.setTimeZone}
                options={TIME_ZONES}
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <FormButton
                type="button"
                variant="secondary"
                disabled={!p.dirty || p.saving}
                onClick={p.discardAll as any}
              >
                Discard
              </FormButton>

              <FormButton type="submit" disabled={!p.dirty || p.saving}>
                {p.saving ? "Saving..." : "Save changes"}
              </FormButton>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
