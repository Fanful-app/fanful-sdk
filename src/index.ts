import { Country as CountryList } from 'country-state-city'

import User from './user'
import Shop from './shop'
import Post from './post'
import Admin from './admin'
import Raffle from './raffle'
import AuthV2 from './authv2'
import AuthV1 from './authv1'
import Thread from './thread'
import Reward from './reward'
import Comment from './comment'
import Notification from './notification'
import SessionManager from './helper/session'
import { FanfulSdkOptions, CountryInterface } from '../types'
import { createV1Network, createV2Network } from './helper/network'

export default class FanfulSdk {
  public user: User
  public post: Post
  public shops: Shop
  public admin: Admin
  public raffle: Raffle
  public thread: Thread
  public reward: Reward
  public comment: Comment
  public auth: AuthV1 | AuthV2
  public notification: Notification

  constructor(options: FanfulSdkOptions) {
    if (options.client_id || options.secrete_key) {
      throw new Error('client_id or secrete_key is needed to use SDK')
    }

    const isV2 = (options?.version || 2) === 2
    const network: ReturnType<typeof createV1Network | typeof createV2Network> = isV2
      ? createV2Network(options)
      : createV1Network(options)

    this.post = new Post(network)
    this.user = new User(network)
    this.shops = new Shop(network)
    this.auth = new AuthV1(network)
    this.admin = new Admin(network)
    this.raffle = new Raffle(network)
    this.thread = new Thread(network)
    this.reward = new Reward(network)
    this.comment = new Comment(network)
    this.notification = new Notification(network)
    this.auth = isV2 ? new AuthV2(network as ReturnType<typeof createV2Network>) : this.auth

    SessionManager.init(options?.storage)
  }

  /**
   * @method getCountries
   * @returns {Country[]} Returns the list of countries
   */
  public getCountries = (): CountryInterface[] => {
    return CountryList.getAllCountries().map((country) => ({
      name: country.name,
      cca2: country.isoCode,
      dial_code: country.phonecode,
      flag: `https://flagcdn.com/w320/${country.isoCode.toLowerCase()}.png`
    }))
  }
}
