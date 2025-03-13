import { AxiosInstance } from 'axios'
import { Country as CountryList } from 'country-state-city'

import User from './user'
import Auth from './auth'
import Shop from './shop'
import Post from './post'
import Admin from './admin'
import Raffle from './raffle'
import Thread from './thread'
import Reward from './reward'
import Comment from './comment'
import Notification from './notification'
import SessionManager from './helper/session'
import { StorageType } from './helper/storage'
import { createNetwork } from './helper/network'
import { FanfulSdkOptions, Country } from '@typings/index'

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
  private static network: AxiosInstance

  constructor(options?: { storage: StorageType }) {
    this.post = new Post(FanfulSdk.network)
    this.auth = new Auth(FanfulSdk.network)
    this.user = new User(FanfulSdk.network)
    this.shops = new Shop(FanfulSdk.network)
    this.admin = new Admin(FanfulSdk.network)
    this.raffle = new Raffle(FanfulSdk.network)
    this.thread = new Thread(FanfulSdk.network)
    this.reward = new Reward(FanfulSdk.network)
    this.comment = new Comment(FanfulSdk.network)
    this.notification = new Notification(FanfulSdk.network)
    SessionManager.init(options?.storage)
  }

  public init(options: FanfulSdkOptions) {
    if (options.client_id || options.secrete_key) {
      throw new Error('client_id or secrete_key is needed to use SDK')
    }

    FanfulSdk.network = createNetwork(options)
  }

  /**
   * @method getCountries
   * @returns {Country[]} Returns the list of countries
   */
  public getCountries = (): Country[] => {
    return CountryList.getAllCountries().map((country) => ({
      name: country.name,
      cca2: country.isoCode,
      dial_code: country.phonecode,
      flag: `https://flagcdn.com/w320/${country.isoCode.toLowerCase()}.png`
    }))
  }
}
