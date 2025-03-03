export interface BasicResponseInterface<T = null, M = null> {
  payload: T
  metadata: M
  status: number
  message: string
}

interface RewardMetadata {
  message: string
  isMaxPointForTheDay: boolean
}

interface PaginateResult<T = any> {
  docs: T[]
  meta?: any
  limit: number
  offset: number
  totalDocs: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  pagingCounter: number
  page?: number | undefined
  prevPage?: number | null | undefined
  nextPage?: number | null | undefined
  [customLabel: string]: T[] | number | boolean | null | undefined
}

interface PaginateStoreResult<T = StoreInterface> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

type FanfulSdkOptions = {
  client_id: string
  secrete_key: string
  mode?: 'test' | 'production'
}

interface PaginateParams extends Pick<PaginateResult, 'page'> {}

interface SocialInterface {
  ALL?: HandleInterface[]
  TIKTOK?: HandleInterface[]
  TWITTER: HandleInterface[]
  INSTAGRAM: HandleInterface[]
  PENDING_ACCOUNTS: HandleInterface[]
}

interface HandleInterface {
  id: string
  _id?: string
  avatar?: string
  username: string
  platform: string
  priority: string
  display_name: string
}

interface ClientInterface {
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

interface CreateClientInterface
  extends Pick<
    ClientInterface,
    'company_name' & 'company_url' & 'company_email_address' & 'company_address' & 'company_logo'
  > {
  password: string
}

type SetUpConfigInterface = {
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

type SubscriptionConfigInterface = {
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

type SignInInterface = {
  password: string
  phone_number?: string
  email_address?: string
}

type UpdateProfileInterface = Partial<RecursivePartial<ClientInterface>>

type ForgotPasswordInterface = Pick<SignInInterface, 'email_address'>

type SendNotificationInterface = {
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

type StoreInterface = {
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

type SubscriptionInterface = {
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

interface NotificationInterface {
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

interface FcmTokenInterface {
  device_id?: string
  is_active?: boolean
  device_type?: string
  device_token?: string
}

declare enum ShopTypeInterface {
  FEATURED = 'FEATURED',
  FAN_FAVORITES = 'FAN_FAVORITES'
}

interface ShopResponse {
  sort: Sort
  size: number
  last: boolean
  first: boolean
  empty: boolean
  number: number
  pageable: Pageable
  totalPages: number
  totalElements: number
  numberOfElements: number
  content: ShopDetailResponse[]
}

interface ShopDetailResponse {
  id: number
  url: string
  name: string
  imageUrl: string
  storeTerms: string
  description: string
  trackingUrl: string
  categories: string[]
  generalTerms: string
  seoFriendlyId: string
  specificTerms: string
  commission: Commission
}

interface Commission {
  value: string
  format: string
}

interface Pageable {
  sort: Sort
  paged: boolean
  offset: number
  unpaged: boolean
  pageSize: number
  pageNumber: number
}

interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface ShopInterface {
  featured: ShopDetailResponse[]
  fan_favorites: ShopDetailResponse[]
}

interface SearchShopResponse
  extends Pick<ShopDetailResponse, 'id' | 'name' | 'url' | 'description' | 'commission'> {}

type CreateShop = {
  id?: string
  seo: string
  url: string
  name: string
  type?: string
  client_id?: string
  commission: string
  storeType?: string
  description: string
  points_per_dollar: number
  imageUrl: File | undefined
}

interface RewardFilterInterface {
  filter_type: 'history_points' | 'fan_points'
}

interface RaffleFilterInterface {
  filter_type: 'raffles' | 'my_entries'
}

interface RewardPointInterface {
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

interface RaffleInterface {
  id: string
  title: string
  points: number
  image_url: string
  close_date: string
  description: string
  client_app_id: string
  total_no_of_entries: number
}

interface RaffleEntryInterface extends RaffleInterface {
  user_id: string
  raffle_id: string
  is_closed: boolean
  no_of_entries: number
  status: RaffleEntryStatusType
}

interface FanPointsInterface {
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

type ParticipantList = {
  status: string
  username: string
  first_name: string
  phone_number: string
  email_address: string
  no_of_entries: string
}

interface RaffleParamInterface extends PaginateParams, Pick<RaffleInterface, 'id'> {
  client_id: string
  status: string
}

type ImageAsset = {
  [x: string]: string
}

interface PostFilterInterface extends Partial<Pick<PostInterface, 'post_type'>> {
  user_id?: string
  filter_type: 'Recent' | 'Top'
}

interface ThumbnailResource {
  src: string
  config_width: number
  config_height: number
}

interface PostMediaInterface {
  url: string
  width: number
  height: number
  media_key: string
  duration_ms: number
  blur_hash_url: string
  preview_image_url: string
  display_resources: ThumbnailResource[]
  preview_image_resources: ThumbnailResource[]
  type: 'ALL' | 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM' | 'CAPTION'
}

interface PostInterface extends PostFilterInterface {
  id: string
  type?: string
  caption: string
  timestamp: string
  is_owner: boolean
  is_addon?: boolean
  has_liked: boolean
  created_at: string
  updated_at: string
  has_commented: boolean
  number_of_likes: number
  permalink?: string | null
  number_of_comments: number
  media_urls: PostMediaInterface[]
  media_type: PostMediaInterface['type']
  post_type: 'ALL' | 'INSTAGRAM' | 'TWITTER' | 'COMMUNITY' | 'ARTICLE'
  user: Pick<UserInterface, 'display_name' | 'username' | 'avatar' | 'id'>
}

interface CommentInterface
  extends Pick<
    PostInterface,
    | 'id'
    | 'user'
    | 'caption'
    | 'is_owner'
    | 'timestamp'
    | 'has_liked'
    | 'filter_type'
    | 'number_of_likes'
  > {
  post_id: string
  thread_id: string | null
  number_of_replies: number
}

type CreatePostInterface = Pick<PostInterface, 'caption'> & {
  media_type: PostInterface['media_type']
  media_urls?: (PostMediaInterface & { raw: ImageAsset })[]
}

type CreateCommentInterface = Pick<
  CommentInterface,
  'id' | 'post_id' | 'caption' | 'thread_id' | 'filter_type'
> &
  PostFilterInterface

type ReactOnPostInterface = Pick<PostInterface, 'id' | 'has_liked' | 'number_of_likes'> &
  PostFilterInterface

type ReactOnCommentInterface = ReactOnPostInterface &
  Pick<CommentInterface, 'post_id' | 'thread_id' | 'filter_type'>

interface Country {
  name: string
  cca2: string
  cca3: string
  flag: string
  type?: string
  dialCode: string
}

interface UserInterface {
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

interface UserRewardPointSystemInterface {
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

interface UserRankInterface extends Pick<UserInterface, 'username' | 'avatar'> {
  total_reward_points: number
  leader_board_position: number
}

interface UserProfileFollowersOrFollowingInterface
  extends Pick<
    UserInterface,
    'id' | 'avatar' | 'username' | 'is_follower' | 'display_name' | 'is_following'
  > {}

interface UserReferralInterface extends Pick<UserInterface, 'username' | 'avatar' | 'id'> {}

interface UserSessionInterface {
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

type FollowAndUnFollowProfileInterface = Pick<
  UserInterface,
  'id' | 'is_following' | 'number_of_following'
> & { user?: Partial<UserInterface> }

type BlockProfileInterface = Pick<UserInterface, 'id' | 'is_blocked'>

type ReportInterface = Pick<UserInterface, 'id'> & { reason: string }

type ReportCommentInterface = Pick<ReportInterface, 'reason'> & {
  post_id: string
  thread_id?: string
  comment_id: string
}

type ProfileQueryParamInterface = {
  userId?: string
  enabled?: boolean
  isDefaultUser?: boolean
}

type ProfileFollowersOrFollowingQueryParamInterface = Pick<UserInterface, 'username'> & {
  user_id: string
  is_following_page: boolean
}

type SignInUserInterface = Partial<
  Pick<UserInterface, 'email_address' | 'password' | 'username' | 'phone_number'>
>

type SignUpUserInterface = Pick<
  UserInterface,
  'dob' | 'password' | 'last_name' | 'first_name' | 'phone_number' | 'email_address'
>

type VerifyUserOtpInterface = {
  token: string
} & Partial<Pick<UserInterface, 'phone_number' | 'email_address'>>

// type ForgotPasswordInterface = Partial<Pick<UserInterface, 'email_address' | 'phone_number'>>

type ResetPasswordInterface = Pick<UserInterface, 'password'> &
  ForgotPasswordInterface & {
    confirm_password: string
  }

// type UpdateProfileInterface = Partial<Pick<UserInterface, 'username' | 'avatar'>>

type User = {
  _id: string
  username: string
  last_name: string
  first_name: string
  avatar: string | null
}

type UsersPerClient = {
  name: string
  user_count: number
}

type Metric = {
  count: number
  growth_in_percent: number
}

type MetricsInterface = {
  client: Metric
  raffles: Metric
  new_users: User[]
  reported_users: Metric
  flagged_content: Metric
  users_per_client: UsersPerClient[]
}

type CountryMetrics = {
  id: string
  name: string
  user_count: number
  latlng: [number, number]
}

type CountryMetricsInterface = CountryMetrics[]

type SubscribersMetrics = {
  MVP: number
  PRO: number
  date: string
}

type SubscribersMetricsInterface = SubscribersMetrics[]

type CountryInfo = {
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

declare enum RaffleEntryStatusType {
  WON = 'WON',
  LOST = 'LOST',
  PENDING = 'PENDING'
}

declare enum RewardPointType {
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

declare enum NotificationType {
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
