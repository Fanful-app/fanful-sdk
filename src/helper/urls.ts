import { PaginateParams } from '@typings/global'
import { CreateCommentInterface, ReactOnCommentInterface, ReactOnPostInterface } from '@typings/post'
import { BlockProfileInterface, FollowAndUnFollowProfileInterface, ProfileFollowersOrFollowingQueryParamInterface } from '@typings/user'

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
  deleteComment: (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) => `comments/${params.id}`,
  seenNotification: (id: string) => `/notifications/${id}/seen`,
  markAllNotification: '/notifications/seen/all',
  registerPushNotification: '/account/fcm-device',
  createPost: '/posts',
  likeAndUnlikePost: (payload: ReactOnPostInterface) => `/posts/${payload.id}/${payload.has_liked ? 'like' : 'unlike'}`,
  reportPost: 'posts/report',
  deletePost: (payload: Pick<ReactOnPostInterface, 'id'>) => `posts/${payload.id}`,
  followAndUnFollow: (params: FollowAndUnFollowProfileInterface) => `account/${params.id}/${params.is_following ? 'unfollow' : 'follow'}`,
  blockProfile: (params: BlockProfileInterface) => `account/${params.id}/${params.is_blocked ? 'unblock' : 'block'}`,
  reportProfile: 'account/report',
  joinRaffle: (raffleId: string) => `/raffles/${raffleId}/join`,
  wonRaffle: (raffleId: string) => `/raffles/${raffleId}/won-details`,
  rewardOnDailyAppOpening: '/rewards/open-app',
  rewardOnTimeSpent: '/rewards/time-spent',
  rewardOnShopping: '/rewards/shop-reward',
  rewardOnLiveChat: '/rewards/live-chat',
  signInUser: '/auth/signin',
  signUpUser: '/auth/signup',
  verifyUserOtp: '/auth/verify-otp',
  updateProfile: '/account',
  forgotPassword: '/auth/forgot-password',
  resendOTP: '/auth/resend-otp',
  resetPassword: '/auth/reset-password',
  refreshAccessToken: '/auth/refresh-token',
  logoutUser: '/auth/signout',
  deleteUser: '/account',
  likeAndUnlikeThread: (params: ReactOnCommentInterface) => `/threads/${params.id}/${params.has_liked ? 'like' : 'unlike'}`,
  createThread: (params: CreateCommentInterface) => `/comments/${params.thread_id}/thread`,
  deleteThread: (
    params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>
  ) => `comments/${params.id}`
}
