import { AxiosInstance } from 'axios'

import { URLS } from './helper/urls'
import {
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  RewardPointInterface,
  BasicResponseInterface
} from '../types'

export default class Reward {
  private static web: { network: AxiosInstance }

  constructor(web: typeof Reward.web) {
    Reward.web = web
  }

  /**
   * @method get
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<RewardPointInterface>>} Returns a list of rewards
   */
  public get = async (params: PaginateParams): Promise<PaginateResult<RewardPointInterface>> => {
    const { data } = await Reward.web.network.get<
      BasicResponseInterface<PaginateResult<RewardPointInterface>>
    >(URLS.getRewards, { params })

    return data.payload
  }

  /**
   * @method getFanRewardPoints
   * @returns {Promise<PaginateResult<{ daily: PaginateResult<RewardPointInterface[]>; continues: PaginateResult<RewardPointInterface[]> }>>} Returns the list of fan reward points
   */
  public getPoints = async (): Promise<
    PaginateResult<{
      daily: PaginateResult<RewardPointInterface[]>
      continues: PaginateResult<RewardPointInterface[]>
    }>
  > => {
    const { data } = await Reward.web.network.get<
      BasicResponseInterface<
        PaginateResult<{
          daily: PaginateResult<RewardPointInterface[]>
          continues: PaginateResult<RewardPointInterface[]>
        }>
      >
    >(URLS.getFanRewardPoints)

    return data.payload
  }

  /**
   * @method rewardOnDailyAppOpening
   * @returns {Promise<RewardMetadata>} Reward user on daily app opening
   */
  public rewardOnDailyAppOpening = async (): Promise<RewardMetadata> => {
    const { data } = await Reward.web.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnDailyAppOpening
    )

    return data.payload
  }

  /**
   * @method rewardOnTimeSpent
   * @returns {Promise<RewardMetadata>} Reward user based on Time spent
   */
  public rewardOnTimeSpent = async (): Promise<RewardMetadata> => {
    const { data } = await Reward.web.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnTimeSpent
    )

    return data.payload
  }

  /**
   * @method rewardOnShopping
   * @returns {Promise<RewardMetadata>} Reward user based on shopping
   */
  public rewardOnShopping = async (): Promise<RewardMetadata> => {
    const { data } = await Reward.web.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnShopping
    )

    return data.payload
  }

  /**
   * @method rewardOnLiveChat
   * @returns {Promise<RewardMetadata>} Reward user on Live chat
   */
  public rewardOnLiveChat = async (): Promise<RewardMetadata> => {
    const { data } = await Reward.web.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnLiveChat
    )

    return data.payload
  }
}
