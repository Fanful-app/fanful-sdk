import { BasicResponseInterface, PaginateParams, PaginateResult } from '@typings/global'
import { FcmTokenInterface, NotificationInterface } from '@typings/notification'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'

export default class Notification {
  private static network: AxiosInstance

  constructor(network: AxiosInstance) {
    Notification.network = network
  }

  /**
   * @method get
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<NotificationInterface>>} Returns a list of notifications
   */
  public get = async (params?: PaginateParams): Promise<PaginateResult<NotificationInterface>> => {
    const { data } = await Notification.network.get<
      BasicResponseInterface<PaginateResult<NotificationInterface>>
    >(URLS.getNotifications, { params })

    return data.payload
  }

  /**
   * @method seen
   * @param {Pick<NotificationInterface, 'id'>} params
   * @returns {Promise<T>} Make or Mark a Notification as seen
   */
  public seen = async ({ id }: Pick<NotificationInterface, 'id'>) => {
    const { data } = await Notification.network.post<BasicResponseInterface>(
      URLS.seenNotification(id)
    )

    return data.payload
  }

  /**
   * @method markAllNotification
   * @returns {Promise<T>} Mark all Notification as seen
   */
  public markAll = async () => {
    const { data } = await Notification.network.post<BasicResponseInterface>(
      URLS.markAllNotification
    )

    return data.payload
  }

  /**
   * @method registerPushNotification
   * @param {FcmTokenInterface} payload
   * @returns {Promise<T>} Register Push Notification on device
   */
  public register = async (payload: FcmTokenInterface) => {
    const { data } = await Notification.network.post<BasicResponseInterface>(
      URLS.registerPushNotification,
      payload
    )

    return data.payload
  }
}
