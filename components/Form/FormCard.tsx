import { brand } from "../brand"

export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: brand.paper,
        borderColor: "color-mix(in srgb, var(--dk-ink) 10%, transparent)",
      }}
    >
      {children}
    </div>
  )
}
