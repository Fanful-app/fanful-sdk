import { AxiosInstance } from 'axios'

import {
  BlockProfileInterface,
  Country,
  FollowAndUnFollowProfileInterface,
  ForgotPasswordInterface,
  ProfileFollowersOrFollowingQueryParamInterface,
  ReportCommentInterface,
  ReportInterface,
  ResetPasswordInterface,
  SignInUserInterface,
  SignUpUserInterface,
  UpdateProfileInterface,
  UserInterface,
  UserProfileFollowersOrFollowingInterface,
  UserRankInterface,
  UserReferralInterface,
  UserSessionInterface,
  VerifyUserOtpInterface
} from '@typings/user'
import { URLS } from '@app/helper/urls'
import { createNetwork } from '@app/helper/network'
import {
  CommentInterface,
  CreateCommentInterface,
  CreatePostInterface,
  PostFilterInterface,
  PostInterface,
  ReactOnCommentInterface,
  ReactOnPostInterface
} from '@typings/post'
import {
  PaginateParams,
  PaginateResult,
  FanfulSdkOptions,
  BasicResponseInterface,
  RewardMetadata
} from '@typings/global'
import { RaffleEntryInterface, RaffleFilterInterface, RewardPointInterface } from '@typings/reward'
import { FcmTokenInterface, NotificationInterface } from '@typings/notification'
import { ShopInterface, ShopResponse } from '@typings/shop'
import { getAssetMeta } from './helper/getAssets'
import { omit } from './helper/omit'

export default class FanfulSdk {
  private static network: AxiosInstance
  // public static test_network: AxiosInstance

  // public static initSDK(options: FanfulSdkOptions) {
  //   this.network = this.test_network
  //   FanfulSdk.test_network = createNetwork(options)
  // }

  constructor(options: FanfulSdkOptions) {
    FanfulSdk.network = createNetwork(options)
    // FanfulSdk.initSDK(options)
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
  public getUserProfile = async (userId: string): Promise<UserSessionInterface['user']> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<UserSessionInterface['user']>
    >(URLS.getUserProfile(userId))

    return data.payload
  }

  /**
   * @method getProfileFollowersOrFollowing
   * @returns {Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>>} Returns profile followers or following
   */
  public getProfileFollowersOrFollowing = async (
    params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface
  ): Promise<PaginateResult<UserProfileFollowersOrFollowingInterface>> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<UserProfileFollowersOrFollowingInterface>>
    >(URLS.getProfileFollowersOrFollowing(params), { params: { page: params.page } })

    return data.payload
  }

  /**
   * @method getFanRewardPoints
   * @returns {Promise<PaginateResult<{ daily: PaginateResult<RewardPointInterface[]>; continues: PaginateResult<RewardPointInterface[]> }>>} Returns the list of fan reward points
   */
  public getFanRewardPoints = async (): Promise<
    PaginateResult<{
      daily: PaginateResult<RewardPointInterface[]>
      continues: PaginateResult<RewardPointInterface[]>
    }>
  > => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<
        PaginateResult<{
          daily: PaginateResult<RewardPointInterface[]>
          continues: PaginateResult<RewardPointInterface[]>
        }>
      >
    >(URLS.getFanRewardPoints)

    return data.payload
  }

  /**
   * @method getComment
   * @param {Pick<CommentInterface, 'post_id'> & PaginateParams} params
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns the list of comment
   */
  public getComment = async (
    params: Pick<CommentInterface, 'post_id'> & PaginateParams
  ): Promise<PaginateResult<CommentInterface>> => {
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
  public getNotifications = async (
    params?: PaginateParams
  ): Promise<PaginateResult<NotificationInterface>> => {
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
  }: PaginateParams & RaffleFilterInterface): Promise<PaginateResult<RaffleEntryInterface>> => {
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
  public getRankPoints = async (
    params?: PaginateParams
  ): Promise<
    PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
  > => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<
        PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
      >
    >(URLS.getRankPoints, { params })

    return data.payload
  }

  /**
   * @method getRewards
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<RewardPointInterface>>} Returns a list of rewards
   */
  public getRewards = async (
    params: PaginateParams
  ): Promise<PaginateResult<RewardPointInterface>> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<RewardPointInterface>>
    >(URLS.getRewards, { params })

    return data.payload
  }

  /**
   * @method getShops
   * @returns {Promise<ShopInterface>} Returns a list of shops
   */
  public getShops = async (): Promise<ShopInterface> => {
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
  }: Partial<Omit<ShopResponse, 'content'>> & { search: string }): Promise<ShopResponse> => {
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
  ): Promise<PaginateResult<CommentInterface>> => {
    const { data } = await FanfulSdk.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getThread, { params })

    return data.payload
  }

  /**
   * @method likeAndUnlikeComment
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<RewardMetadata>} Like and Unlike a comment
   */
  public likeAndUnlikeComment = async (params: ReactOnCommentInterface) => {
    const { data } = await FanfulSdk.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikeComment(params)
    )

    return data.payload
  }

  /**
   * @method createComment
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface, RewardMetadata>} Create comment for a post
   */
  public createComment = async ({ post_id, ...payload }: CreateCommentInterface) => {
    const { data } = await FanfulSdk.network.post<
      BasicResponseInterface<CommentInterface, RewardMetadata>
    >(URLS.createComment(post_id), payload)

    return { metadata: data.metadata, payload: data.payload }
  }

  /**
   * @method reportComment
   * @param {ReportCommentInterface} payload
   * @returns {Promise<any>} Report a comment
   */
  public reportComment = async (payload: Omit<ReportCommentInterface, 'post_id'>): Promise<any> => {
    const { data } = await FanfulSdk.network.put<BasicResponseInterface>(
      URLS.reportComment,
      payload
    )

    return data.payload
  }

  /**
   * @method likeAndUnlikeComment
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public deleteComment = async (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) => {
    const { data } = await FanfulSdk.network.delete<BasicResponseInterface>(
      URLS.deleteComment(params)
    )

    return data.payload
  }

  /**
   * @method seenNotification
   * @param {Pick<NotificationInterface, 'id'>} params
   * @returns {Promise<T>} Make or Mark a Notification as seen
   */
  public seenNotification = async ({ id }: Pick<NotificationInterface, 'id'>) => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(URLS.seenNotification(id))

    return data.payload
  }

  /**
   * @method markAllNotification
   * @returns {Promise<T>} Mark all Notification as seen
   */
  public markAllNotification = async () => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(URLS.markAllNotification)

    return data.payload
  }

  /**
   * @method registerPushNotification
   * @param {FcmTokenInterface} payload
   * @returns {Promise<T>} Register Push Notification on device
   */
  public registerPushNotification = async (payload: FcmTokenInterface) => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(
      URLS.registerPushNotification,
      payload
    )

    return data.payload
  }

  /**
   * @method createPost
   * @param {CreatePostInterface} payload
   * @returns {Promise<PostInterface, RewardMetadata>} Create a Post
   */
  public createPost = async (payload: CreatePostInterface) => {
    const form = new FormData()
    form.append('caption', payload.caption)
    form.append('media_type', payload.media_type)

    payload.media_urls?.map((media) => {
      //@ts-ignore
      form.append('files', {
        uri: media.url,
        name: media.raw.fileName || media.media_key,
        type: media.type === 'IMAGE' ? 'image/jpeg' : 'video/mp4'
      })
    })

    const { data } = await FanfulSdk.network.post<
      BasicResponseInterface<PostInterface, RewardMetadata>
    >(URLS.createPost, form)

    return { metadata: data.metadata, payload: data.payload }
  }

  /**
   * @method likeAndUnlikePost
   * @param {ReactOnPostInterface} payload
   * @returns {Promise<RewardMetadata>} Like and Unlike a Post
   */
  public likeAndUnlikePost = async (payload: ReactOnPostInterface): Promise<RewardMetadata> => {
    const { data } = await FanfulSdk.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikePost(payload)
    )

    return data.payload
  }

  /**
   * @method reportPost
   * @param {ReportInterface} payload
   * @returns {Promise<T>} Report a Post
   */
  public reportPost = async (payload: ReportInterface) => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(URLS.reportPost, {
      post_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method deletePost
   * @param {Pick<ReactOnPostInterface, 'id'>} payload
   * @returns {Promise<T>} Delete a Post
   */
  public deletePost = async (payload: Pick<ReactOnPostInterface, 'id'>) => {
    const { data } = await FanfulSdk.network.delete<BasicResponseInterface>(
      URLS.deletePost(payload)
    )

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
    const { data } = await FanfulSdk.network.put<BasicResponseInterface<RewardMetadata>>(
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
    const { data } = await FanfulSdk.network.put<BasicResponseInterface>(URLS.blockProfile(params))

    return data.payload
  }

  /**
   * @method reportProfile
   * @param {ReportInterface} payload
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public reportProfile = async (payload: ReportInterface) => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(URLS.reportProfile, {
      user_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method joinRaffle
   * @param {string} raffleId
   * @returns {Promise<RaffleEntryInterface>} Join a Raffle
   */
  public joinRaffle = async (raffleId: string): Promise<RaffleEntryInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<RaffleEntryInterface>>(
      URLS.joinRaffle(raffleId)
    )

    return data.payload
  }

  /**
   * @method wonRaffle
   * @param {{ raffleId: string; email_address: string }} params
   * @returns {Promise<T>} Win a raffle
   */
  public wonRaffle = async (params: { raffleId: string; email_address: string }) => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(
      URLS.wonRaffle(params.raffleId),
      { email_address: params.email_address }
    )

    return data.payload
  }

  /**
   * @method rewardOnDailyAppOpening
   * @returns {Promise<RewardMetadata>} Reward user on daily app opening
   */
  public rewardOnDailyAppOpening = async (): Promise<RewardMetadata> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnDailyAppOpening
    )

    return data.payload
  }

  /**
   * @method rewardOnTimeSpent
   * @returns {Promise<RewardMetadata>} Reward user based on Time spent
   */
  public rewardOnTimeSpent = async (): Promise<RewardMetadata> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnTimeSpent
    )

    return data.payload
  }

  /**
   * @method rewardOnShopping
   * @returns {Promise<RewardMetadata>} Reward user based on shopping
   */
  public rewardOnShopping = async (): Promise<RewardMetadata> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnShopping
    )

    return data.payload
  }

  /**
   * @method rewardOnLiveChat
   * @returns {Promise<RewardMetadata>} Reward user on Live chat
   */
  public rewardOnLiveChat = async (): Promise<RewardMetadata> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnLiveChat
    )

    return data.payload
  }

  /**
   * @method signInUser
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signInUser = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserSessionInterface>>(
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

    const { data } = await FanfulSdk.network.put<BasicResponseInterface<UserInterface>>(
      URLS.updateProfile,
      form
    )

    return data.payload
  }

  /**
   * @method forgotPassword
   * @param {ForgotPasswordInterface} payload
   * @returns {Promise<UserInterface>} Request for Forgot Password
   */
  public forgotPassword = async (payload: ForgotPasswordInterface): Promise<UserInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserInterface>>(
      URLS.forgotPassword,
      payload
    )

    return data.payload
  }

  /**
   * @method resendOTP
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserInterface>} Resend OTP for a user
   */
  public resendOTP = async (payload: SignInUserInterface): Promise<UserInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resendOTP,
      payload
    )

    return data.payload
  }

  /**
   * @method resetPassword
   * @param {Omit<ResetPasswordInterface, 'confirm_password'>} payload
   * @returns {Promise<UserInterface>} Request for Reset Password
   */
  public resetPassword = async (
    payload: Omit<ResetPasswordInterface, 'confirm_password'>
  ): Promise<UserInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resetPassword,
      payload
    )

    return data.payload
  }

  /**
   * @method refreshAccessToken
   * @param {Pick<UserSessionInterface, 'refresh_token'>} payload
   * @returns {Promise<UserSessionInterface>} Refresh Access Token
   */
  public refreshAccessToken = async (
    payload: Pick<UserSessionInterface, 'refresh_token'>
  ): Promise<UserSessionInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.refreshAccessToken,
      payload
    )

    return data.payload
  }

  /**
   * @method logoutUser
   * @returns {Promise<T>} Logs out a user
   */
  public logoutUser = async () => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface>(URLS.logoutUser)

    return data.payload
  }

  /**
   * @method deleteUser
   * @returns {Promise<T>} Delete User Account Data
   */
  public deleteUser = async () => {
    const { data } = await FanfulSdk.network.delete<BasicResponseInterface>(URLS.deleteUser)

    return data.payload
  }

  /**
   * @method likeAndUnlikeThread
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<T>} Like and Unlike a Thread
   */
  public likeAndUnlikeThread = async (params: ReactOnCommentInterface) => {
    const { data } = await FanfulSdk.network.put<BasicResponseInterface>(
      URLS.likeAndUnlikeThread(params)
    )

    return data.payload
  }

  /**
   * @method createThread
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface>} Create a Thread for a comment
   */
  public createThread = async (params: CreateCommentInterface): Promise<CommentInterface> => {
    const { data } = await FanfulSdk.network.post<BasicResponseInterface<CommentInterface>>(
      URLS.createThread(params),
      { caption: params.caption, id: params.id }
    )

    return data.payload
  }

  /**
   * @method deleteThread
   * @param {Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>} params
   * @returns {Promise<T>} Delete a Thread from a comment
   */
  public deleteThread = async (
    params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>
  ) => {
    const { data } = await FanfulSdk.network.delete<BasicResponseInterface>(
      URLS.deleteThread(params),
      { params: omit(params, 'post_id') }
    )

    return data.payload
  }
}
