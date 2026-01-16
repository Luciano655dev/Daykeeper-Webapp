export function safeApiMessage(err: any) {
  try {
    return JSON.parse(err?.message).message || "Something went wrong."
  } catch {
    return err?.message || "Something went wrong."
  }
}

export async function readJsonSafe<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T
  } catch {
    return null
  }
}

export function sameString(a: string, b: string) {
  return a.trim() === b.trim()
}

export function formDataHasAnyField(fd: FormData) {
  for (const _ of fd.entries()) return true
  return false
}
