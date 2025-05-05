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

export const SHOP_URLS = {
  getShops: '/client/shops',
  searchShops: (search: string) => `/stores/search?term=${search}`
}

export const POST_URLS = {
  getPosts: '/posts',
  createPost: '/posts',
  reportPost: 'posts/report',
  getPost: (postId: string) => `/posts/${postId}`,
  likeAndUnlikePost: (payload: ReactOnPostInterface) =>
    `/posts/${payload.id}/${payload.has_liked ? 'like' : 'unlike'}`,
  deletePost: (payload: Pick<ReactOnPostInterface, 'id'>) => `posts/${payload.id}`
}

export const USER_URLS = {
  deleteUser: '/account',
  updateProfile: '/account',
  reportProfile: 'account/report',
  getReferrals: '/account/referrals',
  registerPushNotification: '/account/fcm-device',
  getUserProfile: (userId: string) => `/account/${userId}`,
  blockProfile: (params: BlockProfileInterface) =>
    `/account/${params.id}/${params.is_blocked ? 'unblock' : 'block'}`,
  followAndUnFollow: (params: FollowAndUnFollowProfileInterface) =>
    `/account/${params.id}/${params.is_following ? 'unfollow' : 'follow'}`,
  getProfileFollowersOrFollowing: (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ) => `/account/${params.user_id}/${params.is_following_page ? 'following' : 'followers'}`
}

export const THREAD_URLS = {
  getThread: '/threads',
  likeAndUnlikeThread: (params: ReactOnCommentInterface) =>
    `/threads/${params.id}/${params.has_liked ? 'like' : 'unlike'}`,
  createThread: (params: CreateCommentInterface) => `/comments/${params.thread_id}/thread`,
  deleteThread: (params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>) =>
    `/comments/${params.id}`
}

export const REWARD_URLS = {
  getRewards: '/rewards',
  getRankPoints: '/rewards/leader-board',
  rewardOnLiveChat: '/rewards/live-chat',
  rewardOnTimeSpent: '/rewards/time-spent',
  rewardOnShopping: '/rewards/shop-reward',
  getFanRewardPoints: '/rewards/fan-points',
  rewardOnDailyAppOpening: '/rewards/open-app'
}

export const RAFFLE_URLS = {
  joinRaffle: (raffleId: string) => `/raffles/${raffleId}/join`,
  wonRaffle: (raffleId: string) => `/raffles/${raffleId}/won-details`,
  getRaffles: (filter_type: string) =>
    `/raffles${filter_type === 'my_entries' ? '/raffle-entries' : ''}`
}

export const COMMENT_URLS = {
  getComment: '/comments',
  reportComment: 'comments/report',
  createComment: (post_id: string) => `/posts/${post_id}/comment`,
  likeAndUnlikeComment: (params: ReactOnCommentInterface) =>
    `/comments/${params.id}/${params.has_liked ? 'like' : 'unlike'}`,
  deleteComment: (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) =>
    `comments/${params.id}`
}

export const NOTIFICATION_URLS = {
  getNotifications: '/notifications',
  markAllNotification: '/notifications/seen/all',
  seenNotification: (id: string) => `/notifications/${id}/seen`
}

export const ADMIN_URLS = {
  getMetrics: '/admin/metrics',
  createClient: '/admin/clients',
  getRankedEntries: '/admin/ranked-entries',
  getCountryMetrics: '/admin/country-metrics',
  getClient: (id: string) => `/clients?client_id=${id}`,
  getSubscriptionMetrics: '/admin/subscription-metrics',
  updateClient: (id: string) => `/clients/${id}/update-credentials`,
  updateRaffle: (id: string) => `/clients/raffles/?raffle_id=${id}`,
  whiteLabelClientApp: (id: string) => `/admin/clients/${id}/create-app`,
  addShop: (client_id: string) => `/clients/shops?client_id=${client_id}`,
  updateShop: (payload: CreateShop) => `/clients/shops?shop_id=${payload.id}`,
  updatePendingSocial: (id: string) => `/clients/pending-social?client_id=${id}`,
  createRaffle: (client_id: string) => `/clients/raffles/?client_id=${client_id}`,
  updateFanPoints: (client_id: string) => `/clients/fan-point?client_id=${client_id}`,
  updateCredentials: (client_id: string) => `/clients/credentials?client_id=${client_id}`,
  exportClientUsers: (client_id: string) => `/clients/export-users?client_id=${client_id}`,

  updateSubscriptionConfig: (client_id: string) =>
    `/admin/subscription-config/?client_id=${client_id}`,
  deleteClient: (payload: Pick<ClientInterface, 'client_id'>) =>
    `/admin/clients?client_id=${payload.client_id}`,
  getClients: (payload: PaginateParams) =>
    `admin/clients?limit=${payload?.page || DEFAULT_PAGINATION}`,
  getReportedUsers: (payload: PaginateParams) =>
    `/admin/reported-users?limit=${payload.page || DEFAULT_PAGINATION}`,
  removeShop: (payload: { id: string; shop_id: string }) =>
    `/clients/shops?client_id=${payload.id}&shop_id=${payload.shop_id}`,
  getReportedContents: (payload: PaginateParams) =>
    `/admin/reported-contents?limit=${payload.page || DEFAULT_PAGINATION}`,
  deleteRaffle: (payload: RaffleParamInterface) =>
    `/clients/raffles?raffle_id=${payload.id}&client_id=${payload.client_id}`,
  resolveReportedUser: (payload: { user_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-users?client_id=${payload.id}&report_id=${payload.user_id}`,
  suspendReportedUser: (payload: { user_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-users?client_id=${payload.id}&report_id=${payload.user_id}`,
  getLoyalizeStores: (payload: { page?: number; size?: number }, client_id: string) =>
    `/admin/loyalize-stores?page=${payload.page || 0}&limit=${
      payload.size || 50
    }&client_id=${client_id}`,
  keepReportedContent: (payload: { content_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-contents?report_id=${payload.content_id}&client_id=${payload.id}`,
  deleteReportedContent: (payload: { content_id: string } & Pick<ClientInterface, 'id'>) =>
    `/admin/reported-contents?report_id=${payload.content_id}&client_id=${payload.id}`,
  getClientUsers: (payload: PaginateParams, client_id: string) =>
    `/clients/users?limit=${payload?.page || DEFAULT_PAGINATION}&client_id=${client_id}`,
  getRaffleParticipants: (payload: PaginateParams, raffle_id: string, client_id: string) =>
    `/clients/raffle/participants?page=${
      payload.page || 0
    }&raffle_id=${raffle_id}&client_id=${client_id}`
}

export const URLS = {
  getCountries: '/country',
  ...AUTH_URLS,
  ...SHOP_URLS,
  ...POST_URLS,
  ...USER_URLS,
  ...REWARD_URLS,
  ...RAFFLE_URLS,
  ...THREAD_URLS,
  ...COMMENT_URLS,
  ...NOTIFICATION_URLS
}
