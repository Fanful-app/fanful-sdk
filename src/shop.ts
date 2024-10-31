import { BasicResponseInterface } from '@typings/global'
import { ShopInterface, ShopResponse } from '@typings/shop'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'

export default class Shop {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getShops
   * @returns {Promise<ShopInterface>} Returns a list of shops
   */
  public getShops = async (): Promise<ShopInterface> => {
    const { data } = await this.network.get<BasicResponseInterface<ShopInterface>>(URLS.getShops)

    return data.payload
  }

  /**
   * @method searchShops
   * @param {string} search
   * @returns {Promise<ShopResponse>} Returns a list of searched shops
   */
  public searchShops = async ({
    search,
    ...params
  }: Partial<Omit<ShopResponse, 'content'>> & { search: string }): Promise<ShopResponse> => {
    const { data } = await this.network.get<ShopResponse>(URLS.searchShops(search), {
      params
    })

    return data
  }
}
