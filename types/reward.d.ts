export interface RewardFilterInterface {
  filter_type: 'history_points' | 'fan_points'
}

export interface RaffleFilterInterface {
  filter_type: 'raffles' | 'my_entries'
}

export enum RewardPointType {
  SHOP = 'SHOP',
  CHAT = 'CHAT',
  CHEER = 'CHEER',
  REFER = 'REFER',
  ENGAGE = 'ENGAGE',
  CREATOR = 'CREATOR',
  CONNECT = 'CONNECT',
  EXPRESS = 'EXPRESS',
  WELCOME = 'WELCOME',
  PRACTICE = 'PRACTICE',
  INFORMED = 'INFORMED',
  CASH_OUT = 'CASH_OUT',
  INFLUENCE = 'INFLUENCE',
  REFERRAL_BONUS = 'REFERRAL_BONUS',
  USE_REFERRAL_CODE = 'USE_REFERRAL_CODE'
}

export interface RewardPointInterface {
  id: string
  title: string
  points: number
  subtitle: string
  max_count: number
  current_count: number
  type: RewardPointType
  is_completed: boolean
  created_at: Date | string | number
  updated_at: Date | string | number
}

export enum RaffleEntryStatusType {
  WON = 'WON',
  LOST = 'LOST',
  PENDING = 'PENDING'
}

export enum RaffleStatusInterface {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export interface RaffleInterface {
  id: string
  title: string
  points: number
  image_url: string
  close_date: string
  description: string
  client_app_id: string
  total_no_of_entries: number
}

export interface RaffleEntryInterface extends RaffleInterface {
  user_id: string
  raffle_id: string
  is_closed: boolean
  no_of_entries: number
  status: RaffleEntryStatusType
}

export interface FanPointsInterface {
  chat: {
    value: number
    daily_cap: number
  }
  open_app?: {
    value: number
    daily_cap: number
  }
  cheer: {
    value: number
    daily_cap: number
  }
  refer: {
    value: number
    daily_cap: number
  }
  engage: {
    value: number
    daily_cap: number
  }
  create: {
    value: number
    daily_cap: number
  }
  welcome: {
    value: number
    daily_cap: number
  }
  connect: {
    value: number
    daily_cap: number
  }
  express: {
    value: number
    daily_cap: number
  }
  practice: {
    value: number
    daily_cap: number
  }
  influence: {
    value: number
    daily_cap: number
  }
}

export type ParticipantList = {
  status: string
  username: string
  first_name: string
  phone_number: string
  email_address: string
  no_of_entries: string
}

export interface RaffleParamInterface
  extends PaginateParams,
    Pick<RaffleInterface, 'id' | 'status'> {
  client_id: string
}
