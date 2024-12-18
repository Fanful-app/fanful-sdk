import { AxiosInstance } from 'axios'

import { URLS } from '@app/helper/urls'
import { getAssetMeta } from './helper/utils'
import {
  UserInterface,
  ReportInterface,
  SignInUserInterface,
  UserSessionInterface,
  BlockProfileInterface,
  UserReferralInterface,
  UpdateProfileInterface,
  FollowAndUnFollowProfileInterface,
  UserProfileFollowersOrFollowingInterface,
  ProfileFollowersOrFollowingQueryParamInterface,
  UserRankInterface
} from '@typings/user'

import {
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  BasicResponseInterface
} from '@typings/global'

export default class User {
  private static network: AxiosInstance

  constructor(network: AxiosInstance) {
    User.network = network
  }

  /**
   * @method getReferrals
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<UserReferralInterface>>} Returns the list of referrals
   */
  public getReferrals = async (
    params: PaginateParams
  ): Promise<PaginateResult<UserReferralInterface>> => {
    const { data } = await User.network.get<
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
    const { data } = await User.network.get<BasicResponseInterface<UserSessionInterface['user']>>(
      URLS.getUserProfile(userId)
    )

    return data.payload
  }

  /**
   * @method getFollowers
   * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
   */
  public getFollowers = async (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ): Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>> => {
    const { data } = await User.network.get<
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
    const { data } = await User.network.get<
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
    const { data } = await User.network.put<BasicResponseInterface<RewardMetadata>>(
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
    const { data } = await User.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.followAndUnFollow(params)
    )

    return data.payload
  }

  /**
   * @method blockProfile
   * @param {BlockProfileInterface} params
   * @returns {Promise<T>} Block a User Profile
   */
  public blockProfile = async (params: BlockProfileInterface) => {
    const { data } = await User.network.put<BasicResponseInterface>(URLS.blockProfile(params))

    return data.payload
  }

  /**
   * @method report
   * @param {ReportInterface} payload
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public report = async (payload: ReportInterface) => {
    const { data } = await User.network.post<BasicResponseInterface>(URLS.reportProfile, {
      user_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method signInUser
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signInUser = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { data } = await User.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signInUser,
      payload
    )

    return data.payload
  }

  /**
   * @method updateProfile
   * @param {UpdateProfileInterface} payload
   * @returns {Promise<UserInterface>} Updates a user profile
   */
  public updateProfile = async (payload: UpdateProfileInterface): Promise<UserInterface> => {
    const form = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
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

    const { data } = await User.network.put<BasicResponseInterface<UserInterface>>(
      URLS.updateProfile,
      form
    )

    return data.payload
  }

  /**
   * @method delete.
   * @returns {Promise<T>} Delete User Account Data
   */
  public delete = async () => {
    const { data } = await User.network.delete<BasicResponseInterface>(URLS.deleteUser)

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
    const { data } = await User.network.get<
      BasicResponseInterface<
        PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
      >
    >(URLS.getRankPoints, { params })

    return data.payload
  }
}
