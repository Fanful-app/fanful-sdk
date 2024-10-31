import { AxiosInstance } from 'axios'

import { Country, UserInterface, UserRankInterface, ResetPasswordInterface } from '@typings/user'
import { URLS } from '@app/helper/urls'
import { createNetwork } from '@app/helper/network'
import {
  PaginateParams,
  PaginateResult,
  FanfulSdkOptions,
  BasicResponseInterface
} from '@typings/global'
import User from './user'
import Auth from './auth'
import Comment from './comment'
import Post from './post'
import Raffle from './raffle'
import Thread from './thread'
import Reward from './reward'
import Notification from './notification'

// // FanfulSdk
//           user ->
//           auth ->
//           post ->
//           comment ->
//           thread ->
//           raffle ->
//           store ->
//           reward ->

export default class FanfulSdk {
  public static user: User
  public static auth: Auth
  public static comment: Comment
  public static post: Post
  public static raffle: Raffle
  public static thread: Thread
  public static reward: Reward
  public static notification: Notification
  private static network: AxiosInstance

  constructor(options: FanfulSdkOptions) {
    const instance = createNetwork(options)
    FanfulSdk.network = instance
    FanfulSdk.user = new User(instance)
    FanfulSdk.auth = new Auth(instance)
    FanfulSdk.post = new Post(instance)
    FanfulSdk.comment = new Comment(instance)
    FanfulSdk.raffle = new Raffle(instance)
    FanfulSdk.thread = new Thread(instance)
    FanfulSdk.reward = new Reward(instance)
    FanfulSdk.notification = new Notification(instance)
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
}
