import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { API_URL } from "@/config"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username: raw } = await params
  const username = decodeURIComponent(raw || "").replace(/^@/, "")

  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value

  const res = await fetch(`${API_URL}/${encodeURIComponent(username)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(refreshToken ? { "x-refresh-token": refreshToken } : {}),
    },
    cache: "no-store",
  })

  if (res.status === 404) {
    return NextResponse.json({ message: "Not found" }, { status: 404 })
  }

  if (!res.ok) {
    return NextResponse.json({ message: "Failed" }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
