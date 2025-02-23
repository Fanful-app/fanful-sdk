interface User {
  _id: string
  username: string
  last_name: string
  first_name: string
  avatar: string | null
}

interface UsersPerClient {
  name: string
  user_count: number
}

interface Metric {
  count: number
  growth_in_percent: number
}

export interface MetricsInterface {
  client: Metric
  raffles: Metric
  new_users: User[]
  reported_users: Metric
  flagged_content: Metric
  users_per_client: UsersPerClient[]
}

interface CountryMetrics {
  id: string
  name: string
  user_count: number
  latlng: [number, number]
}

export type CountryMetricsInterface = CountryMetrics[]

interface SubscribersMetrics {
  MVP: number
  PRO: number
  date: string
}

export type SubscribersMetricsInterface = SubscribersMetrics[]

export type CountryInfo = {
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  cca2: string
  cca3: string
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  idd: {
    root: string
    suffixes: string[]
  }
  latlng: [number, number]
}
