import { AxiosInstance } from 'axios'

import User from './user'
import Auth from './auth'
import Post from './post'
import Admin from './admin'
import Raffle from './raffle'
import Thread from './thread'
import Reward from './reward'
import Comment from './comment'
import { URLS } from '@app/helper/urls'
import { Country } from '@typings/user'
import Notification from './notification'
import { createNetwork } from '@app/helper/network'
import { FanfulSdkOptions, BasicResponseInterface } from '@typings/global'

export default class FanfulSdk {
  public user: User
  public auth: Auth
  public post: Post
  public admin: Admin
  public raffle: Raffle
  public thread: Thread
  public reward: Reward
  public comment: Comment
  public notification: Notification
  private static network: AxiosInstance

  constructor(options: FanfulSdkOptions) {
    if (options.client_id || options.secrete_key) {
      throw new Error('client_id and secrete_key is needed to use SDK')
    }

    const instance = createNetwork(options)

    FanfulSdk.network = instance
    this.user = new User(instance)
    this.auth = new Auth(instance)
    this.post = new Post(instance)
    this.admin = new Admin(instance)
    this.raffle = new Raffle(instance)
    this.thread = new Thread(instance)
    this.reward = new Reward(instance)
    this.comment = new Comment(instance)
    this.notification = new Notification(instance)
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
}
