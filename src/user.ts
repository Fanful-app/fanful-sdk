import { AxiosInstance } from 'axios'

import {
  UserInterface,
  ReportInterface,
  SignInUserInterface,
  SignUpUserInterface,
  UserSessionInterface,
  BlockProfileInterface,
  UserReferralInterface,
  VerifyUserOtpInterface,
  UpdateProfileInterface,
  FollowAndUnFollowProfileInterface,
  UserProfileFollowersOrFollowingInterface,
  ProfileFollowersOrFollowingQueryParamInterface
} from '@typings/user'
import { URLS } from '@app/helper/urls'

import {
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  BasicResponseInterface
} from '@typings/global'

import { getAssetMeta } from './helper/utils'

export default class User {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getReferrals
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<UserReferralInterface>>} Returns the list of referrals
   */
  public getReferrals = async (
    params: PaginateParams
  ): Promise<PaginateResult<UserReferralInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<UserReferralInterface>>
    >(URLS.getReferrals, { params })

    return data.payload
  }

  /**
   * @method getUserProfile
   * @param {string} userId - user id to search for a profile
   * @returns {Promise<UserSessionInterface['user']>} Returns a user profile details
   */
  public getUserProfile = async (userId: string): Promise<UserSessionInterface['user']> => {
    const { data } = await this.network.get<BasicResponseInterface<UserSessionInterface['user']>>(
      URLS.getUserProfile(userId)
    )

    return data.payload
  }

  /**
   * @method getProfileFollowersOrFollowing
   * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
   */
  public getProfileFollowersOrFollowing = async (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ): Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<UserProfileFollowersOrFollowingInterface>>
    >(URLS.getProfileFollowersOrFollowing(params), { params: { page: params.page } })

    return data.payload
  }

  /**
   * @method followAndUnFollow
   * @param {FollowAndUnFollowProfileInterface} params
   * @returns {Promise<RewardMetadata>} Follow or Unfollow a user
   */
  public followAndUnFollow = async (
    params: FollowAndUnFollowProfileInterface
  ): Promise<RewardMetadata> => {
    const { data } = await this.network.put<BasicResponseInterface<RewardMetadata>>(
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
    const { data } = await this.network.put<BasicResponseInterface>(URLS.blockProfile(params))

    return data.payload
  }

  /**
   * @method reportProfile
   * @param {ReportInterface} payload
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public reportProfile = async (payload: ReportInterface) => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.reportProfile, {
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
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signInUser,
      payload
    )

    return data.payload
  }

  /**
   * @method signUpUser
   * @param {SignUpUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Signup a user
   */
  public signUpUser = async (payload: SignUpUserInterface): Promise<UserSessionInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signUpUser,
      payload
    )

    return data.payload
  }

  /**
   * @method verifyUserOtp
   * @param {VerifyUserOtpInterface} payload
   * @returns {Promise<UserSessionInterface>} Verify a user OTP
   */
  public verifyUserOtp = async (payload: VerifyUserOtpInterface): Promise<UserSessionInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.verifyUserOtp,
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

    const { data } = await this.network.put<BasicResponseInterface<UserInterface>>(
      URLS.updateProfile,
      form
    )

    return data.payload
  }

  /**
   * @method logoutUser
   * @returns {Promise<T>} Logs out a user
   */
  public logoutUser = async () => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.logoutUser)

    return data.payload
  }

  /**
   * @method deleteUser
   * @returns {Promise<T>} Delete User Account Data
   */
  public deleteUser = async () => {
    const { data } = await this.network.delete<BasicResponseInterface>(URLS.deleteUser)

    return data.payload
  }
}
