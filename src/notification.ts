import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import {
  PaginateParams,
  PaginateResult,
  FcmTokenInterface,
  NotificationInterface,
  BasicResponseInterface
} from '../types'

export default class Notification {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof Notification.web) {
    Notification.web = web
  }

  /**
   * @method get
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<NotificationInterface>>} Returns a list of notifications
   */
  public get = async (params?: PaginateParams): Promise<PaginateResult<NotificationInterface>> => {
    const { data } = await Notification.web.network.get<
      BasicResponseInterface<PaginateResult<NotificationInterface>>
    >(URLS.getNotifications, { params })

    return data.payload
  }

  /**
   * @method seen
   * @param {Pick<NotificationInterface, 'id'>} params
   * @returns {Promise<BasicResponseInterface>} Make or Mark a Notification as seen
   */
  public seen = async ({ id }: Pick<NotificationInterface, 'id'>): Promise<null> => {
    const { data } = await Notification.web.network.post<BasicResponseInterface>(
      URLS.seenNotification(id)
    )

    return data.payload
  }

  /**
   * @method markAllNotification
   * @returns {Promise<null>} Mark all Notification as seen
   */
  public markAll = async (): Promise<null> => {
    const { data } = await Notification.web.network.post<BasicResponseInterface>(
      URLS.markAllNotification
    )

    return data.payload
  }

  /**
   * @method registerPushNotification
   * @param {FcmTokenInterface} payload
   * @returns {Promise<null>} Register Push Notification on device
   */
  public register = async (payload: FcmTokenInterface): Promise<null> => {
    const { data } = await Notification.web.network.post<BasicResponseInterface>(
      URLS.registerPushNotification,
      payload
    )

    return data.payload
  }
}
