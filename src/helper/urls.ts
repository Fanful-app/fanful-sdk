import { DEFAULT_PAGINATION } from './constants'
import {
  CreateShop,
  PaginateParams,
  ClientInterface,
  RaffleParamInterface,
  ReactOnPostInterface,
  BlockProfileInterface,
  CreateCommentInterface,
  ReactOnCommentInterface,
  FollowAndUnFollowProfileInterface,
  ProfileFollowersOrFollowingQueryParamInterface
} from '../../types'

export const AUTH_URLS = {
  signInUser: '/auth/signin',
  signUpUser: '/auth/signup',
  logoutUser: '/auth/signout',
  resendOTP: '/auth/resend-otp',
  verifyUserOtp: '/auth/verify-otp',
  resetPassword: '/auth/reset-password',
  forgotPassword: '/auth/forgot-password',
  refreshAccessToken: '/auth/refresh-token'
}

export const SHOP_URLS = {}

export const POST_URLS = {}

export const USER_URLS = {}

export const REWARD_URLS = {}

export const RAFFLE_URLS = {}

export const COMMENT_URLS = {}

export const NOTIFICATION_URLS = {}

export const URLS = {
  getPosts: '/posts',
  getThread: '/threads',
  getRewards: '/rewards',
  getComment: '/comments',
  getCountries: '/country',
  getShops: '/client/shops',
  getReferrals: '/account/referrals',
  getNotifications: '/notifications',
  getRankPoints: '/rewards/leader-board',
  getFanRewardPoints: '/rewards/fan-points',
  getRaffles: (filter_type: string) =>
    `/raffles${filter_type === 'my_entries' ? '/raffle-entries' : ''}`,
  getPost: (postId: string) => `/posts/${postId}`,
  getProfileFollowersOrFollowing: (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ) => `/account/${params.user_id}/${params.is_following_page ? 'following' : 'followers'}`,
  getUserProfile: (userId: string) => `/account/${userId}`,
  searchShops: (search: string) => `/stores/search?term=${search}`,
  likeAndUnlikeComment: (params: ReactOnCommentInterface) =>
    `/comments/${params.id}/${params.has_liked ? 'like' : 'unlike'}`,
  createComment: (post_id: string) => `/posts/${post_id}/comment`,
  reportComment: 'comments/report',
  deleteComment: (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) =>
    `comments/${params.id}`,
  seenNotification: (id: string) => `/notifications/${id}/seen`,
  markAllNotification: '/notifications/seen/all',
  registerPushNotification: '/account/fcm-device',
  createPost: '/posts',
  likeAndUnlikePost: (payload: ReactOnPostInterface) =>
    `/posts/${payload.id}/${payload.has_liked ? 'like' : 'unlike'}`,
  reportPost: 'posts/report',
  deletePost: (payload: Pick<ReactOnPostInterface, 'id'>) => `posts/${payload.id}`,
  followAndUnFollow: (params: FollowAndUnFollowProfileInterface) =>
    `/account/${params.id}/${params.is_following ? 'unfollow' : 'follow'}`,
  blockProfile: (params: BlockProfileInterface) =>
    `/account/${params.id}/${params.is_blocked ? 'unblock' : 'block'}`,
  reportProfile: 'account/report',
  joinRaffle: (raffleId: string) => `/raffles/${raffleId}/join`,
  wonRaffle: (raffleId: string) => `/raffles/${raffleId}/won-details`,
  rewardOnDailyAppOpening: '/rewards/open-app',
  rewardOnTimeSpent: '/rewards/time-spent',
  rewardOnShopping: '/rewards/shop-reward',
  rewardOnLiveChat: '/rewards/live-chat',
  updateProfile: '/account',
  deleteUser: '/account',
  likeAndUnlikeThread: (params: ReactOnCommentInterface) =>
    `/threads/${params.id}/${params.has_liked ? 'like' : 'unlike'}`,
  createThread: (params: CreateCommentInterface) => `/comments/${params.thread_id}/thread`,
  deleteThread: (params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>) =>
    `/comments/${params.id}`,
  getClients: (payload: PaginateParams) =>
    `admin/clients?limit=${payload?.page || DEFAULT_PAGINATION}`,
  getMetrics: '/admin/metrics',
  createClient: '/admin/clients',
  deleteClient: (payload: Pick<ClientInterface, 'client_id'>) =>
    `/admin/clients?client_id=${payload.client_id}`,
  getCountryMetrics: '/admin/country-metrics',
  getSubscriptionMetrics: '/admin/subscription-metrics',
  updateSubscriptionConfig: (client_id: string) =>
    `/admin/subscription-config/?client_id=${client_id}`,
  getReportedUsers: (payload: PaginateParams) =>
    `/admin/reported-users?limit=${payload.page || DEFAULT_PAGINATION}`,
  resolveReportedUser: (payload: { user_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-users?client_id=${payload.id}&report_id=${payload.user_id}`,
  suspendReportedUser: (payload: { user_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-users?client_id=${payload.id}&report_id=${payload.user_id}`,
  getReportedContents: (payload: PaginateParams) =>
    `/admin/reported-contents?limit=${payload.page || DEFAULT_PAGINATION}`,
  keepReportedContent: (payload: { content_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-contents?report_id=${payload.content_id}&client_id=${payload.id}`,
  deleteReportedContent: (payload: { content_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-contents?report_id=${payload.content_id}&client_id=${payload.id}`,
  getLoyalizeStores: (payload: { page?: number; size?: number }, client_id: string) =>
    `/admin/loyalize-stores?page=${payload.page || 0}&limit=${
      payload.size || 50
    }&client_id=${client_id}`,
  getRankedEntries: '/admin/ranked-entries',
  whiteLabelClientApp: (id: string) => `/admin/clients/${id}/create-app`,
  getClient: (id: string) => `/clients?client_id=${id}`,
  getRaffleParticipants: (payload: PaginateParams, raffle_id: string, client_id: string) =>
    `/clients/raffle/participants?page=${
      payload.page || 0
    }&raffle_id=${raffle_id}&client_id=${client_id}`,
  exportClientUsers: (client_id: string) => `/clients/export-users?client_id=${client_id}`,
  getClientUsers: (payload: PaginateParams, client_id: string) =>
    `/clients/users?limit=${payload?.page || DEFAULT_PAGINATION}&client_id=${client_id}`,
  updateClient: (id: string) => `/clients/${id}/update-credentials`,
  createRaffle: (client_id: string) => `/clients/raffles/?client_id=${client_id}`,
  updateRaffle: (id: string) => `/clients/raffles/?raffle_id=${id}`,
  deleteRaffle: (payload: RaffleParamInterface) =>
    `/clients/raffles?raffle_id=${payload.id}&client_id=${payload.client_id}`,
  removeShop: (payload: { id: string; shop_id: string }) =>
    `/clients/shops?client_id=${payload.id}&shop_id=${payload.shop_id}`,
  addShop: (client_id: string) => `/clients/shops?client_id=${client_id}`,
  updateShop: (payload: CreateShop) => `/clients/shops?shop_id=${payload.id}`,
  updateFanPoints: (client_id: string) => `/clients/fan-point?client_id=${client_id}`,
  updateCredentials: (client_id: string) => `/clients/credentials?client_id=${client_id}`,
  updatePendingSocial: (id: string) => `/clients/pending-social?client_id=${id}`,
  ...AUTH_URLS,
  ...SHOP_URLS,
  ...POST_URLS,
  ...USER_URLS,
  ...REWARD_URLS,
  ...RAFFLE_URLS,
  ...COMMENT_URLS,
  ...NOTIFICATION_URLS
}
