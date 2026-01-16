import type { TimeZoneOption } from "../types/edit_profile"

export const TIME_ZONES: TimeZoneOption[] = [
  { value: "UTC", label: "UTC", flag: "🌐", keywords: "gmt universal" },

  {
    value: "America/New_York",
    label: "America/New_York (ET)",
    flag: "🇺🇸",
    keywords: "new york eastern et usa us",
  },
  {
    value: "America/Chicago",
    label: "America/Chicago (CT)",
    flag: "🇺🇸",
    keywords: "chicago central ct usa us",
  },
  {
    value: "America/Denver",
    label: "America/Denver (MT)",
    flag: "🇺🇸",
    keywords: "denver mountain mt usa us",
  },
  {
    value: "America/Los_Angeles",
    label: "America/Los_Angeles (PT)",
    flag: "🇺🇸",
    keywords: "los angeles la pacific pt usa us",
  },
  {
    value: "America/Phoenix",
    label: "America/Phoenix",
    flag: "🇺🇸",
    keywords: "phoenix arizona usa us",
  },
  {
    value: "America/Anchorage",
    label: "America/Anchorage",
    flag: "🇺🇸",
    keywords: "anchorage alaska usa us",
  },
  {
    value: "Pacific/Honolulu",
    label: "Pacific/Honolulu",
    flag: "🇺🇸",
    keywords: "honolulu hawaii usa us",
  },

  {
    value: "America/Sao_Paulo",
    label: "America/Sao_Paulo (Brazil)",
    flag: "🇧🇷",
    keywords: "sao paulo brasil brazil br",
  },
  {
    value: "America/Fortaleza",
    label: "America/Fortaleza (Brazil)",
    flag: "🇧🇷",
    keywords: "fortaleza brasil brazil br",
  },
  {
    value: "America/Manaus",
    label: "America/Manaus (Brazil)",
    flag: "🇧🇷",
    keywords: "manaus brasil brazil br",
  },

  {
    value: "Europe/London",
    label: "Europe/London",
    flag: "🇬🇧",
    keywords: "london uk britain england",
  },
  {
    value: "Europe/Lisbon",
    label: "Europe/Lisbon",
    flag: "🇵🇹",
    keywords: "lisbon portugal pt",
  },
  {
    value: "Europe/Paris",
    label: "Europe/Paris",
    flag: "🇫🇷",
    keywords: "paris france fr",
  },
]
