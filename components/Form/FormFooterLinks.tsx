import Link from "next/link"
import { brand } from "../brand"

export default function FormFooterLinks({
  text,
  linkText,
  href,
}: {
  text: string
  linkText: string
  href: string
}) {
  return (
    <p className="mt-6 text-center text-sm" style={{ color: brand.slate }}>
      {text}{" "}
      <Link
        href={href}
        className="font-medium hover:underline"
        style={{ color: brand.ink }}
      >
        {linkText}
      </Link>
    </p>
  )
}
