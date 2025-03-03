import { UserInterface } from './user'
import { PostInterface } from './post'
import { RaffleEntryInterface } from './reward'

export enum NotificationType {
  REFER = 'REFER',
  COMMENTED = 'COMMENTED',
  LIKED_POST = 'LIKED_POST',
  NEW_RAFFLE = 'NEW_RAFFLE',
  RAFFLE_DRAW = 'RAFFLE_DRAW',
  MATCH_RESULT = 'MATCH_RESULT',
  LIKED_COMMENT = 'LIKED_COMMENT',
  REFERRAL_BONUS = 'REFERRAL_BONUS',
  REPLIED_COMMENT = 'REPLIED_COMMENT',
  USE_REFERRAL_CODE = 'USE_REFERRAL_CODE',
  STARTED_FOLLOWING = 'STARTED_FOLLOWING',
  _12_HOUR_BEFORE_RAFFLE_DRAW = '_12_HOUR_BEFORE_RAFFLE_DRAW',
  DAILY_ACCUMULATED_POINT_NOTICE = 'DAILY_ACCUMULATED_POINT_NOTICE'
}

export interface NotificationInterface {
  id: string
  message: string
  post_id: string
  is_seen: boolean
  type: NotificationType
  notification_id?: string
  created_at: Date | string | number
  updated_at: Date | string | number
  post: Pick<PostInterface, 'id'> & { media_url: string }
  raffle?: Pick<RaffleEntryInterface, 'image_url' | 'raffle_id'>
  user?: Pick<UserInterface, 'id' | 'avatar' | 'username' | 'display_name' | 'is_following'>
}

export interface FcmTokenInterface {
  device_id?: string
  is_active?: boolean
  device_type?: string
  device_token?: string
}
