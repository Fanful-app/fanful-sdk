import { BasicResponseInterface, PaginateParams, PaginateResult } from '@typings/global'
import { FcmTokenInterface, NotificationInterface } from '@typings/notification'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'

export default class Notification {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getNotifications
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<NotificationInterface>>} Returns a list of notifications
   */
  public getNotifications = async (
    params?: PaginateParams
  ): Promise<PaginateResult<NotificationInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<NotificationInterface>>
    >(URLS.getNotifications, { params })

    return data.payload
  }

  /**
   * @method seenNotification
   * @param {Pick<NotificationInterface, 'id'>} params
   * @returns {Promise<T>} Make or Mark a Notification as seen
   */
  public seenNotification = async ({ id }: Pick<NotificationInterface, 'id'>) => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.seenNotification(id))

    return data.payload
  }

  /**
   * @method markAllNotification
   * @returns {Promise<T>} Mark all Notification as seen
   */
  public markAllNotification = async () => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.markAllNotification)

    return data.payload
  }

  /**
   * @method registerPushNotification
   * @param {FcmTokenInterface} payload
   * @returns {Promise<T>} Register Push Notification on device
   */
  public registerPushNotification = async (payload: FcmTokenInterface) => {
    const { data } = await this.network.post<BasicResponseInterface>(
      URLS.registerPushNotification,
      payload
    )

    return data.payload
  }
}
