import { brand } from "../brand"

export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: brand.paper,
        borderColor: "rgba(15, 23, 42, 0.10)",
      }}
    >
      {children}
    </div>
  )
}
