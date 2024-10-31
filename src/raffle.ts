import { BasicResponseInterface, PaginateParams, PaginateResult } from '@typings/global'
import { RaffleEntryInterface, RaffleFilterInterface } from '@typings/reward'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'

export default class Raffle {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getRaffles
   * @param {PaginateParams} params
   * @param {RaffleFilterInterface} filter_type
   * @returns {Promise<PaginateResult<RaffleEntryInterface>>} Returns a list of all raffles
   */
  public getRaffles = async ({
    filter_type,
    ...params
  }: PaginateParams & RaffleFilterInterface): Promise<PaginateResult<RaffleEntryInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<RaffleEntryInterface>>
    >(URLS.getRaffles(filter_type), {
      params
    })

    return data.payload
  }

  /**
   * @method joinRaffle
   * @param {string} raffleId
   * @returns {Promise<RaffleEntryInterface>} Join a Raffle
   */
  public joinRaffle = async (raffleId: string): Promise<RaffleEntryInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<RaffleEntryInterface>>(
      URLS.joinRaffle(raffleId)
    )

    return data.payload
  }

  /**
   * @method wonRaffle
   * @param {{ raffleId: string; email_address: string }} params
   * @returns {Promise<T>} Win a raffle
   */
  public wonRaffle = async (params: { raffleId: string; email_address: string }) => {
    const { data } = await this.network.post<BasicResponseInterface>(
      URLS.wonRaffle(params.raffleId),
      { email_address: params.email_address }
    )

    return data.payload
  }
}
