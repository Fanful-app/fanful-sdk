import {
  BasicResponseInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata
} from '@typings/global'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import { RewardPointInterface } from '@typings/reward'

export default class Reward {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getRewards
   * @param {PaginateParams} params
   * @returns {Promise<PaginateResult<RewardPointInterface>>} Returns a list of rewards
   */
  public getRewards = async (
    params: PaginateParams
  ): Promise<PaginateResult<RewardPointInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<RewardPointInterface>>
    >(URLS.getRewards, { params })

    return data.payload
  }

  /**
   * @method getFanRewardPoints
   * @returns {Promise<PaginateResult<{ daily: PaginateResult<RewardPointInterface[]>; continues: PaginateResult<RewardPointInterface[]> }>>} Returns the list of fan reward points
   */
  public getFanRewardPoints = async (): Promise<
    PaginateResult<{
      daily: PaginateResult<RewardPointInterface[]>
      continues: PaginateResult<RewardPointInterface[]>
    }>
  > => {
    const { data } = await this.network.get<
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
    const { data } = await this.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnDailyAppOpening
    )

    return data.payload
  }

  /**
   * @method rewardOnTimeSpent
   * @returns {Promise<RewardMetadata>} Reward user based on Time spent
   */
  public rewardOnTimeSpent = async (): Promise<RewardMetadata> => {
    const { data } = await this.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnTimeSpent
    )

    return data.payload
  }

  /**
   * @method rewardOnShopping
   * @returns {Promise<RewardMetadata>} Reward user based on shopping
   */
  public rewardOnShopping = async (): Promise<RewardMetadata> => {
    const { data } = await this.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnShopping
    )

    return data.payload
  }

  /**
   * @method rewardOnLiveChat
   * @returns {Promise<RewardMetadata>} Reward user on Live chat
   */
  public rewardOnLiveChat = async (): Promise<RewardMetadata> => {
    const { data } = await this.network.post<BasicResponseInterface<RewardMetadata>>(
      URLS.rewardOnLiveChat
    )

    return data.payload
  }
}
