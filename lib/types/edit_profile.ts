export type ApiAuthUser = {
  message?: string
  user?: {
    _id?: string
    email?: string
    username?: string
    displayName?: string
    bio?: string
    timeZone?: string
    profile_picture?: {
      title?: string
      key?: string
      url?: string
    }
  }
}

export type TimeZoneOption = {
  value: string
  label: string
  flag: string
  keywords?: string
}
