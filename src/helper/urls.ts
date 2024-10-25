import { PaginateParams } from '@typings/global'
import { ProfileFollowersOrFollowingQueryParamInterface } from '@typings/user'

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
  searchShops: (search: string) => `/stores/search?term=${search}`
}
