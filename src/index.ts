import { AxiosInstance } from 'axios'

import User from './user'
import Auth from './auth'
import Shop from './shop'
import Post from './post'
import Admin from './admin'
import Raffle from './raffle'
import Thread from './thread'
import Reward from './reward'
import Comment from './comment'
import { URLS } from '@app/helper/urls'
import Notification from './notification'
import { createNetwork } from '@app/helper/network'
import inMemoryStorage, { StorageType } from '@app/helper/storage'
import { FanfulSdkOptions, Country } from '@typings/index'
import { getCountries as countries } from './helper/utils'

export default class FanfulSdk {
  public user: User
  public auth: Auth
  public post: Post
  public shops: Shop
  public admin: Admin
  public raffle: Raffle
  public thread: Thread
  public reward: Reward
  public comment: Comment
  public notification: Notification
  private static storage: StorageType
  private static network: AxiosInstance

  constructor(options?: { storage: StorageType }) {
    this.post = new Post(FanfulSdk.network)
    this.shops = new Shop(FanfulSdk.network)
    this.admin = new Admin(FanfulSdk.network)
    this.raffle = new Raffle(FanfulSdk.network)
    this.thread = new Thread(FanfulSdk.network)
    this.reward = new Reward(FanfulSdk.network)
    this.comment = new Comment(FanfulSdk.network)
    this.notification = new Notification(FanfulSdk.network)
    FanfulSdk.storage = options?.storage || inMemoryStorage
    this.auth = new Auth(FanfulSdk.network, FanfulSdk.storage)
    this.user = new User(FanfulSdk.network, FanfulSdk.storage)
  }

  public init(options: FanfulSdkOptions) {
    if (options.client_id || options.secrete_key) {
      throw new Error('client_id or secrete_key is needed to use SDK')
    }

    FanfulSdk.network = createNetwork(options, FanfulSdk.storage)
  }

  /**
   * @method getCountries
   * @returns {Country[]} Returns the list of countries
   */
  public getCountries = (): Country[] => {
    const data = countries()

    return data
  }
}
