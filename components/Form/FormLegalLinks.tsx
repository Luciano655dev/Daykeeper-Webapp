import Link from "next/link"
import { brand } from "../brand"

export default function FOrmLegalLinks() {
  return (
    <p className="mt-3 text-center text-xs" style={{ color: brand.slate }}>
      <Link href="/terms" className="hover:underline">
        Terms
      </Link>{" "}
      ·{" "}
      <Link href="/privacy" className="hover:underline">
        Privacy
      </Link>
    </p>
  )
}
