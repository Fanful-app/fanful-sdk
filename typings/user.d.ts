import { Country } from './country'
import { FcmTokenInterface } from './notification'

export interface Country {
  name: string
  cca2: string
  cca3: string
  flag: string
  type?: string
  dialCode: string
}

export interface UserInterface {
  id: string
  bio: string
  dob: string
  avatar: string
  ranking: number
  country: Country
  username: string
  password: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string
  post_count?: number
  display_name: string
  phone_number: string
  is_blocked?: boolean
  is_verified: boolean
  reward_points: number
  referral_code: string
  is_follower?: boolean
  email_address?: string
  is_following?: boolean
  number_of_followers?: number
  number_of_following?: number
  unread_notification_count: number
  reward_points_tracker: UserRewardPointSystemInterface | null
}

export interface UserRewardPointSystemInterface {
  like_points: number
  follow_points: number
  comment_points: number
  open_app_points: number
  live_chat_points: number
  view_score_points: number
  time_spent_points: number
  create_post_points: number
  time_spent_timestamp: Date
}

export interface UserRankInterface extends Pick<UserInterface, 'username' | 'avatar'> {
  total_reward_points: number
  leader_board_position: number
}

export interface UserProfileFollowersOrFollowingInterface
  extends Pick<
    UserInterface,
    'id' | 'avatar' | 'username' | 'is_follower' | 'display_name' | 'is_following'
  > {}

export interface UserReferralInterface extends Pick<UserInterface, 'username' | 'avatar' | 'id'> {}

export interface UserSessionInterface {
  access_token: string
  /**
   * A timestamp of when the token was issued. Returned when a login is confirmed.
   */
  issued_at: number
  /**
   * The number of seconds until the token expires (since it was issued). Returned when a login is confirmed.
   */
  expires_in: number
  /**
   * A timestamp of when the token will expire. Returned when a login is confirmed.
   */
  expires_at: number
  stream_token: string
  refresh_token: string
  user: UserInterface | null
  is_password_reset?: boolean
  fcm: FcmTokenInterface | null
  client: { client_id: string; team_name: string }
  password_reset_field?: 'email_address' | 'phone_number'
}

export type FollowAndUnFollowProfileInterface = Pick<
  UserInterface,
  'id' | 'is_following' | 'number_of_following'
> & { user?: Partial<UserInterface> }

export type BlockProfileInterface = Pick<UserInterface, 'id' | 'is_blocked'>

export type ReportInterface = Pick<UserInterface, 'id'> & { reason: string }

export type ReportCommentInterface = Pick<ReportInterface, 'reason'> & {
  post_id: string
  thread_id?: string
  comment_id: string
}

export type ProfileQueryParamInterface = {
  userId?: string
  enabled?: boolean
  isDefaultUser?: boolean
}

export type ProfileFollowersOrFollowingQueryParamInterface = Pick<UserInterface, 'username'> & {
  user_id: string
  is_following_page: boolean
}

export type SignInUserInterface = Partial<
  Pick<UserInterface, 'email_address' | 'password' | 'username' | 'phone_number'>
>

export type SignUpUserInterface = Pick<
  UserInterface,
  'dob' | 'password' | 'last_name' | 'first_name' | 'phone_number' | 'email_address'
>

export type VerifyUserOtpInterface = {
  token: string
} & Partial<Pick<UserInterface, 'phone_number' | 'email_address'>>

export type ForgotPasswordInterface = Partial<Pick<UserInterface, 'email_address' | 'phone_number'>>

export type ResetPasswordInterface = Pick<UserInterface, 'password'> &
  ForgotPasswordInterface & {
    confirm_password: string
  }

export type UpdateProfileInterface = Partial<Pick<UserInterface, 'username' | 'avatar'>>
