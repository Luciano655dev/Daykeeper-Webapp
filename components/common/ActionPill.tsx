export default function ActionPill({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!!disabled}
      className={[
        "w-full py-3 flex justify-center",
        disabled ? "opacity-70 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <div
        className={[
          "px-4 py-2",
          "text-sm font-medium text-(--dk-sky)",
          "hover:text-(--dk-sky)/80 cursor-pointer",
          "inline-flex items-center gap-2",
        ].join(" ")}
      >
        {children}
      </div>
    </button>
  )
}
