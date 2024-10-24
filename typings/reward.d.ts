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
