import { AxiosInstance } from 'axios'

import { URLS } from './helper/urls'
import { ShopInterface, ShopResponse, BasicResponseInterface } from '../types'

export default class Shop {
  private static web: { network: AxiosInstance }

  constructor(web: typeof Shop.web) {
    Shop.web = web
  }

  /**
   * @method get
   * @returns {Promise<ShopInterface>} Returns a list of shops
   */
  public get = async (): Promise<ShopInterface> => {
    const { data } = await Shop.web.network.get<BasicResponseInterface<ShopInterface>>(
      URLS.getShops
    )

    return data.payload
  }

  /**
   * @method search
   * @param {string} search
   * @returns {Promise<ShopResponse>} Returns a list of searched shops
   */
  public search = async ({
    search,
    ...params
  }: Partial<Omit<ShopResponse, 'content'>> & { search: string }): Promise<ShopResponse> => {
    const { data } = await Shop.web.network.get<ShopResponse>(URLS.searchShops(search), {
      params
    })

    return data
  }
}
