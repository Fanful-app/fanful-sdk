import { AxiosInstance } from 'axios'

import { URLS } from './helper/urls'
import {
  PaginateParams,
  PaginateResult,
  RaffleEntryInterface,
  RaffleFilterInterface,
  BasicResponseInterface
} from '../types'

export default class Raffle {
  private static web: { network: AxiosInstance }

  constructor(web: typeof Raffle.web) {
    Raffle.web = web
  }

  /**
   * @method get
   * @param {PaginateParams} params
   * @param {RaffleFilterInterface} filter_type
   * @returns {Promise<PaginateResult<RaffleEntryInterface>>} Returns a list of all raffles
   */
  public get = async ({
    filter_type,
    ...params
  }: PaginateParams & RaffleFilterInterface): Promise<PaginateResult<RaffleEntryInterface>> => {
    const { data } = await Raffle.web.network.get<
      BasicResponseInterface<PaginateResult<RaffleEntryInterface>>
    >(URLS.getRaffles(filter_type), { params })

    return data.payload
  }

  /**
   * @method join
   * @param {string} raffleId
   * @returns {Promise<RaffleEntryInterface>} Join a Raffle
   */
  public join = async (raffleId: string): Promise<RaffleEntryInterface> => {
    const { data } = await Raffle.web.network.post<BasicResponseInterface<RaffleEntryInterface>>(
      URLS.joinRaffle(raffleId)
    )

    return data.payload
  }

  /**
   * @method won
   * @param {{ raffleId: string; email_address: string }} params
   * @returns {Promise<T>} Win a raffle
   */
  public won = async (params: { raffleId: string; email_address: string }) => {
    const { data } = await Raffle.web.network.post<BasicResponseInterface>(
      URLS.wonRaffle(params.raffleId),
      { email_address: params.email_address }
    )

    return data.payload
  }
}
