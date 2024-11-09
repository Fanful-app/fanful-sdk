import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { RewardPointInterface } from '../typings/reward'
import Reward from '../src/reward'
import {
  BasicResponseInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata
} from '../typings/global'
import { RewardPointType } from '../typings/enums'
import { URLS } from '../src/helper/urls'

let mock: MockAdapter
let rewardService: Reward

beforeAll(() => {
  const network: AxiosInstance = axios.create()
  mock = new MockAdapter(network)
  rewardService = new Reward(network)
})

afterEach(() => {
  mock.reset()
})

describe('Reward Service', () => {
  const mockRewardPoint: RewardPointInterface = {
    id: '1',
    title: 'Daily Login',
    points: 10,
    subtitle: 'Reward for daily login',
    max_count: 1,
    current_count: 1,
    type: RewardPointType.ENGAGE,
    is_completed: true,
    created_at: Date.now(),
    updated_at: Date.now()
  }

  const mockRewardMetadata: RewardMetadata = {
    message: 'Rewarded successfully',
    isMaxPointForTheDay: false
  }

  const mockPaginatedRewards: PaginateResult<RewardPointInterface> = {
    items: [mockRewardPoint],
    total: 1,
    page: 1,
    limit: 10,
    docs: [],
    offset: 0,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
    pagingCounter: 0
  }

  it('should fetch rewards with pagination', async () => {
    const params: PaginateParams = { page: 1 }
    mock.onGet(URLS.getRewards, { params }).reply(200, {
      payload: mockPaginatedRewards
    } as BasicResponseInterface<PaginateResult<RewardPointInterface>>)

    const result = await rewardService.get(params)
    expect(result).toEqual(mockPaginatedRewards)
  })

  it('should fetch fan reward points', async () => {
    const mockFanRewardPoints = {
      daily: { items: [mockRewardPoint], total: 1, page: 1, limit: 10 },
      continues: { items: [mockRewardPoint], total: 1, page: 1, limit: 10 }
    }
    mock.onGet(URLS.getFanRewardPoints).reply(200, {
      payload: mockFanRewardPoints
    } as BasicResponseInterface<typeof mockFanRewardPoints>)

    const result = await rewardService.getPoints()
    expect(result).toEqual(mockFanRewardPoints)
  })

  it('should reward on daily app opening', async () => {
    mock.onPost(URLS.rewardOnDailyAppOpening).reply(200, {
      payload: mockRewardMetadata
    } as BasicResponseInterface<RewardMetadata>)

    const result = await rewardService.rewardOnDailyAppOpening()
    expect(result).toEqual(mockRewardMetadata)
  })

  it('should reward based on time spent', async () => {
    mock.onPost(URLS.rewardOnTimeSpent).reply(200, {
      payload: mockRewardMetadata
    } as BasicResponseInterface<RewardMetadata>)

    const result = await rewardService.rewardOnTimeSpent()
    expect(result).toEqual(mockRewardMetadata)
  })

  it('should reward based on shopping', async () => {
    mock.onPost(URLS.rewardOnShopping).reply(200, {
      payload: mockRewardMetadata
    } as BasicResponseInterface<RewardMetadata>)

    const result = await rewardService.rewardOnShopping()
    expect(result).toEqual(mockRewardMetadata)
  })

  it('should reward on live chat', async () => {
    mock.onPost(URLS.rewardOnLiveChat).reply(200, {
      payload: mockRewardMetadata
    } as BasicResponseInterface<RewardMetadata>)

    const result = await rewardService.rewardOnLiveChat()
    expect(result).toEqual(mockRewardMetadata)
  })
})
