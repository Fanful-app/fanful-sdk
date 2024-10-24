import { AxiosInstance } from 'axios'

import { Country } from '@typings/user'
import { URLS } from '@app/helper/urls'
import { createNetwork } from '@app/helper/network'
import { PostFilterInterface, PostInterface } from '@typings/post'
import {
  PaginateParams,
  PaginateResult,
  FanfulSdkOptions,
  BasicResponseInterface
} from '@typings/global'

export default class FanfulSdk {
  private static network: AxiosInstance

  constructor(options: FanfulSdkOptions) {
    FanfulSdk.network = createNetwork(options)
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
}
