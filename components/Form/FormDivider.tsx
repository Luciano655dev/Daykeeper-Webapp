import { brand } from "../brand"

export default function FormDivider({ text = "or" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div
        className="h-px flex-1"
        style={{ background: "rgba(15, 23, 42, 0.10)" }}
      />
      <div className="text-xs" style={{ color: brand.slate }}>
        {text}
      </div>
      <div
        className="h-px flex-1"
        style={{ background: "rgba(15, 23, 42, 0.10)" }}
      />
    </div>
  )
}
