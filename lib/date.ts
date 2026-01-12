import { format, parse } from "date-fns"

export function toDayParam(d: Date) {
  return format(d, "dd-MM-yyyy")
}

export function fromDayParam(value: string | null) {
  if (!value) return null
  const parsed = parse(value, "dd-MM-yyyy", new Date())
  return isNaN(parsed.getTime()) ? null : parsed
}

export function startOfDay(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

export function toDDMMYYYY(d: Date) {
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

export function parseDDMMYYYY(str: string) {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(str)
  if (!match) return null

  const [, dd, mm, yyyy] = match.map(Number)
  const d = new Date(yyyy, mm - 1, dd)
  d.setHours(0, 0, 0, 0)

  // guard invalid dates (31-02-2025 etc)
  if (
    d.getFullYear() !== yyyy ||
    d.getMonth() !== mm - 1 ||
    d.getDate() !== dd
  ) {
    return null
  }

  return d
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
