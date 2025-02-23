import { FanPointsInterface } from './reward'
import { ShopInterface } from './shop'

export interface SocialInterface {
  ALL?: HandleInterface[]
  TIKTOK?: HandleInterface[]
  TWITTER: HandleInterface[]
  INSTAGRAM: HandleInterface[]
  PENDING_ACCOUNTS: HandleInterface[]
}

export interface HandleInterface {
  id: string
  _id?: string
  avatar?: string
  username: string
  platform: string
  priority: string
  display_name: string
}

export interface ClientInterface {
  id: string
  role: string
  app_name: string
  client_id: string
  team_name: string
  full_name: string
  created_at: string
  updated_at: string
  is_deleted: boolean
  company_url: string
  company_name: string
  company_logo: string
  shops: ShopInterface
  phone_number: number
  company_address: string
  league_id: string | null
  supabase_identifier: string
  company_email_address: string
  fan_points: FanPointsInterface
  company_socials: SocialInterface
  client_default_user_avatar?: File
  sport_radar_team_id: string | null
  sport_spyder_api_url: string | null
  scrapper_official_news_url: string | null
  client_configuration: ClientConfiguration
  subscription_config: SubscriptionConfigInterface
}

export interface CreateClientInterface
  extends Pick<
    ClientInterface,
    'company_name' & 'company_url' & 'company_email_address' & 'company_address' & 'company_logo'
  > {
  password: string
}

export type SetUpConfigInterface = {
  id?: string
  app_name: string | null
  team_name: string | null
  primary_color: string | null
  privacy_policy: string | null
  secondary_color: string | null
  fan_point_name?: string | null
  app_icon?: string | File | null
  terms_and_condition: string | null
  fan_point_icon?: string | File | null
  onboarding_frame_one?: string | File | null
  onboarding_frame_two?: string | File | null
  onboarding_frame_four?: string | File | null
  onboarding_frame_three?: string | File | null
}

export type SubscriptionConfigInterface = {
  _id: string
  list: {
    badge?: string
    title?: string
    no_ads?: boolean
    sub_type?: string
    monthly_price?: number
    username_badge?: boolean
    terms_and_policy?: string
    point_multiplier?: number
    entry_into_vip_raffles?: boolean
    annual_discount_percentage?: number
  }[]

  image_url?: string
  title?: string
}

export type SignInInterface = {
  password: string
  phone_number?: string
  email_address?: string
}

export type UpdateProfileInterface = Partial<RecursivePartial<ClientInterface>>

export type ForgotPasswordInterface = Pick<SignInInterface, 'email_address'>

export type SendNotificationInterface = {
  title: string
  admin_message: string
}

type ClientConfiguration = {
  app: {
    app_name: string
    app_icon: string | null
    fan_point_icon: string | null
    fan_point_name: string
    primary_color: string
    privacy_policy: string
    secondary_color: string
    terms_and_condition: string
    onboarding_frame_one: string | null
    onboarding_frame_two: string | null
    onboarding_frame_four: string | null
    onboarding_frame_three: string | null
  }
  credentials: {
    signin: {
      username: boolean
      password: boolean
      phone_number: boolean
      email_address: boolean
    }
    create_account: {
      dob: boolean
      password: boolean
      username: boolean
      phone_number: boolean
      email_address: boolean
      full_name: boolean
    }
    complete_account: {
      bio: boolean
      dob: boolean
      username: boolean
      email_address: boolean
      referral_code: boolean
      full_name: boolean
    }
  }
  _id: string
}

export type StoreInterface = {
  id: number
  url: string
  home: string
  name: string
  commission: {
    value: string
    format: string
  }
  image_url: string
  store_terms: string
  tracking_url: string
  description: string
  countries: string[]
  categories: string[]
  general_terms: string
  is_selected: boolean
  special_terms: string
  seo_friendly_id: string
}

export type SubscriptionInterface = {
  badge?: File
  title?: string
  no_ads?: boolean
  sub_type?: string
  monthly_price?: number
  image_url?: string | File
  username_badge?: boolean
  terms_and_policy?: string
  point_multiplier?: number
  is_header_image?: boolean
  entry_into_vip_raffles?: boolean
  annual_discount_percentage?: number
}
