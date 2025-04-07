import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import SessionManager from './helper/session'
import { getAssetMeta } from './helper/utils'
import {
  UserInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  ReportInterface,
  UserRankInterface,
  UserSessionInterface,
  BlockProfileInterface,
  UserReferralInterface,
  UpdateProfileInterface,
  BasicResponseInterface,
  FollowAndUnFollowProfileInterface,
  UserProfileFollowersOrFollowingInterface,
  ProfileFollowersOrFollowingQueryParamInterface
} from '../types'

export default class User {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof User.web) {
    User.web = web
  }

  /**
   * @method getReferrals
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<UserReferralInterface>>} Returns the list of referrals
   */
  public getReferrals = async (
    params: PaginateParams
  ): Promise<PaginateResult<UserReferralInterface>> => {
    const { data } = await User.web.network.get<
      BasicResponseInterface<PaginateResult<UserReferralInterface>>
    >(URLS.getReferrals, { params })

    return data.payload
  }

  /**
   * @method getProfile
   * @param {string} userId - user id to search for a profile
   * @returns {Promise<UserSessionInterface['user']>} Returns a user profile details
   */
  public getProfile = async (userId: string): Promise<UserSessionInterface['user']> => {
    const { data } = await User.web.network.get<
      BasicResponseInterface<UserSessionInterface['user']>
    >(URLS.getUserProfile(userId))

    return data.payload
  }

  /**
   * @method getFollowers
   * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
   */
  public getFollowers = async (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ): Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>> => {
    const { data } = await User.web.network.get<
      BasicResponseInterface<PaginateResult<UserProfileFollowersOrFollowingInterface>>
    >(URLS.getProfileFollowersOrFollowing(params), { params: { page: params.page } })

    return data.payload
  }

  /**
   * @method getFollowing
   * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
   */
  public getFollowing = async (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ): Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>> => {
    const { data } = await User.web.network.get<
      BasicResponseInterface<PaginateResult<UserProfileFollowersOrFollowingInterface>>
    >(URLS.getProfileFollowersOrFollowing(params), { params: { page: params.page } })

    return data.payload
  }

  /**
   * @method follow
   * @param {FollowAndUnFollowProfileInterface} params
   * @returns {Promise<RewardMetadata>} Follow or Unfollow a user
   */
  public follow = async (params: FollowAndUnFollowProfileInterface): Promise<RewardMetadata> => {
    const { data } = await User.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.followAndUnFollow(params)
    )

    return data.payload
  }

  /**
   * @method unFollow
   * @param {FollowAndUnFollowProfileInterface} params
   * @returns {Promise<RewardMetadata>} Follow or Unfollow a user
   */
  public unFollow = async (params: FollowAndUnFollowProfileInterface): Promise<RewardMetadata> => {
    const { data } = await User.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.followAndUnFollow(params)
    )

    return data.payload
  }

  /**
   * @method blockProfile
   * @param {BlockProfileInterface} params
   * @returns {Promise<null>} Block a User Profile
   */
  public blockProfile = async (params: BlockProfileInterface): Promise<null> => {
    const { data } = await User.web.network.put<BasicResponseInterface>(URLS.blockProfile(params))

    return data.payload
  }

  /**
   * @method report
   * @param {ReportInterface} payload
   * @returns {Promise<null>} Report a User Profile
   */
  public report = async (payload: ReportInterface): Promise<null> => {
    const { data } = await User.web.network.post<BasicResponseInterface>(URLS.reportProfile, {
      user_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method updateProfile
   * @param {UpdateProfileInterface} payload
   * @returns {Promise<UserInterface>} Updates a user profile
   */
  public updateProfile = async (payload: UpdateProfileInterface): Promise<UserInterface> => {
    const form = new FormData()

    Object.entries(payload).forEach(([key, value]: any) => {
      if (key === 'avatar' && !value.includes('https://')) {
        const { ext, name } = getAssetMeta(value)

        //@ts-ignore
        form.append('files', {
          uri: value,
          type: 'image/jpeg',
          name: `${name}.${ext}`
        })
      } else {
        form.append(key, value)
      }
    })

    const { data } = await User.web.network.put<BasicResponseInterface<UserInterface>>(
      URLS.updateProfile,
      form
    )

    // Set back the merged session into the storage
    await SessionManager.updateItem({ user: data.payload })

    return data.payload
  }

  /**
   * @method delete.
   * @returns {Promise<null>} Delete User Account Data
   */
  public delete = async (): Promise<null> => {
    const { data } = await User.web.network.delete<BasicResponseInterface>(URLS.deleteUser)

    return data.payload
  }

  /**
   * @method getLeaderBoardPoints
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<{user: UserRankInterface leader_board: PaginateResult<UserRankInterface>}>>} Returns a list of rank points
   */
  public getRankPoints = async (
    params?: PaginateParams
  ): Promise<
    PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
  > => {
    const { data } = await User.web.network.get<
      BasicResponseInterface<
        PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
      >
    >(URLS.getRankPoints, { params })

    return data.payload
  }
}
