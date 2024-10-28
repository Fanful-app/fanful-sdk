import { AxiosInstance } from 'axios'

import {
  Country,
  UserRankInterface,
  UserReferralInterface,
  UserSessionInterface
} from '@typings/user'
import { URLS } from '@app/helper/urls'
import { createNetwork } from '@app/helper/network'
import { CommentInterface, PostFilterInterface, PostInterface } from '@typings/post'
import {
  PaginateParams,
  PaginateResult,
  FanfulSdkOptions,
  BasicResponseInterface
} from '@typings/global'
import { RaffleEntryInterface, RaffleFilterInterface, RewardPointInterface } from '@typings/reward'
import { NotificationInterface } from '@typings/notification'
import { ShopInterface, ShopResponse } from '@typings/shop'

export default class FanfulSdk {
  private static network: AxiosInstance
  public static test_network: AxiosInstance

  public static initSDK(options: FanfulSdkOptions) {
    this.network = this.test_network
    FanfulSdk.test_network = createNetwork(options)
  }

  constructor(options: FanfulSdkOptions) {
    FanfulSdk.network = createNetwork(options)
    FanfulSdk.initSDK(options)
  }

  /**
   * @method getPosts
   * @param {PaginateParams & PostFilterInterface} params - post filter param object
   * @returns {Promise<PaginateResult<PostInterface>>} Returns the posts based off the filter params passed
   */
  public getPosts = async (
    params: PaginateParams & PostFilterInterface
  ): Promise<PaginateResult<PostInterface>> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<PostInterface>>
    >(URLS.getPosts, { params })

    return data.payload
  }

  /**
   * @method getPost
   * @param {string} post_id - post id to search for
   * @returns {Promise<PostInterface>} Returns the post that matches the id passed
   */
  public getPost = async (post_id: string): Promise<PostInterface> => {
    const { data } = await FanfulSdk.network.get<BasicResponseInterface<PostInterface>>(
      URLS.getPost(post_id)
    )

    return data.payload
  }

  /**
   * @method getCountries
   * @returns {Promise<Country[]>} Returns the list of countries
   */
  public getCountries = async (): Promise<Country[]> => {
    const { data } = await FanfulSdk.network.get<BasicResponseInterface<Country[]>>(
      URLS.getCountries
    )

    return data.payload
  }

  /**
   * @method getReferrals
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<UserReferralInterface>>} Returns the list of referrals
   */
  public getReferrals = async (
    params: PaginateParams
  ): Promise<PaginateResult<UserReferralInterface>> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<UserReferralInterface>>
    >(URLS.getReferrals, { params })

    return data.payload
  }

  /**
   * @method getUserProfile
   * @param {string} userId - user id to search for a profile
   * @returns {Promise<UserSessionInterface['user']>} Returns a user profile details
   */
  public getUserProfile = async (userId: string) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<UserSessionInterface['user']>
    >(URLS.getUserProfile(userId))

    return data.payload
  }

  // /**
  //  * @method getProfileFollowersOrFollowing
  //  * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
  //  */
  // public getProfileFollowersOrFollowing = async (
  //   params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  // ) => {
  //   const { data } = await FanfulSdk.network.get<
  //     BasicResponseInterface<PaginateResult<UserProfileFollowersOrFollowingInterface>>
  //   >(URLS.getProfileFollowersOrFollowing(params), { params: pick(params, 'page') })

  //   return data.payload
  // }

  /**
   * @method getFanRewardPoints
   * @returns {Promise<PaginateResult<{daily: RewardPointInterface[] continues: RewardPointInterface[]}>>} Returns the list of fan reward points
   */
  public getFanRewardPoints = async () => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<{
        daily: RewardPointInterface[]
        continues: RewardPointInterface[]
      }>
    >(URLS.getFanRewardPoints)

    return data.payload
  }

  /**
   * @method getComment
   * @param {Pick<CommentInterface, 'post_id'> & PaginateParams} params
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns the list of comment
   */
  public getComment = async (params: Pick<CommentInterface, 'post_id'> & PaginateParams) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getComment, { params })

    return data.payload
  }

  /**
   * @method getNotifications
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<NotificationInterface>>} Returns a list of notifications
   */
  public getNotifications = async (params?: PaginateParams) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<NotificationInterface>>
    >(URLS.getNotifications, { params })

    return data.payload
  }

  /**
   * @method getRaffles
   * @param {PaginateParams} params
   * @param {RaffleFilterInterface} filter_type
   * @returns {Promise<PaginateResult<RaffleEntryInterface>>} Returns a list of all raffles
   */
  public getRaffles = async ({
    filter_type,
    ...params
  }: PaginateParams & RaffleFilterInterface) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<RaffleEntryInterface>>
    >(URLS.getRaffles(filter_type), {
      params
    })

    return data.payload
  }

  /**
   * @method getRankPoints
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<{user: UserRankInterface leader_board: PaginateResult<UserRankInterface>}>>} Returns a list of rank points
   */
  public getRankPoints = async (params?: PaginateParams) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<{
        user: UserRankInterface
        leader_board: PaginateResult<UserRankInterface>
      }>
    >(URLS.getRankPoints, { params })

    return data.payload
  }

  /**
   * @method getRewards
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<RewardPointInterface>>} Returns a list of rewards
   */
  public getRewards = async (params: PaginateParams) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<RewardPointInterface>>
    >(URLS.getRewards, { params })

    return data.payload
  }

  /**
   * @method getShops
   * @returns {Promise<ShopInterface>} Returns a list of shops
   */
  public getShops = async () => {
    const { data } = await FanfulSdk.network.get<BasicResponseInterface<ShopInterface>>(
      URLS.getShops
    )

    return data.payload
  }

  /**
   * @method searchShops
   * @param {string} search
   * @returns {Promise<ShopResponse>} Returns a list of searched shops
   */
  public searchShops = async ({
    search,
    ...params
  }: Partial<Omit<ShopResponse, 'content'>> & { search: string }) => {
    const { data } = await FanfulSdk.network.get<ShopResponse>(URLS.searchShops(search), {
      params
    })

    return data
  }

  /**
   * @method getThread
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns a list of threads
   */
  public getThread = async (
    params?: Pick<CommentInterface, 'post_id' | 'thread_id'> & PaginateParams
  ) => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getThread, { params })

    return data.payload
  }
}
