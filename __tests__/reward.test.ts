import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Reward from '../src/reward'
import { URLS } from '../src/helper/urls'

const mock = new MockAdapter(axios)
let reward: Reward

beforeEach(() => {
  reward = new Reward(axios)
  mock.reset()
})

describe('Reward Class', () => {
  it('should fetch rewards', async () => {
    const mockResponse = {
      status: 200,
      message: 'Rewards fetched successfully',
      payload: {
        content: [{ id: '1', points: 100 }],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 1
      },
      metadata: null
    }

    const paginateParams = { page: 1, size: 10 }

    mock.onGet(URLS.getRewards).reply(200, mockResponse)

    const result = await reward.get(paginateParams)

    expect(result.content).toEqual(mockResponse.payload.content)
    expect(result.totalElements).toBe(1)
    expect(result.totalPages).toBe(1)
  })

  it('should fetch fan reward points', async () => {
    const mockResponse = {
      status: 200,
      message: 'Fan reward points fetched successfully',
      payload: {
        daily: { content: [{ id: 'daily1', points: 50 }] },
        continues: { content: [{ id: 'continue1', points: 150 }] }
      },
      metadata: null
    }

    mock.onGet(URLS.getFanRewardPoints).reply(200, mockResponse)

    const result = await reward.getPoints()

    expect(result.daily.content).toEqual(mockResponse.payload.daily.content)
    expect(result.continues.content).toEqual(mockResponse.payload.continues.content)
  })

  it('should reward user on daily app opening', async () => {
    const mockResponse = {
      status: 200,
      message: 'Rewarded on daily app opening',
      payload: { points: 50, message: 'You have earned 50 points' },
      metadata: null
    }

    mock.onPost(URLS.rewardOnDailyAppOpening).reply(200, mockResponse)

    const result = await reward.rewardOnDailyAppOpening()

    expect(result.points).toBe(50)
    expect(result.message).toBe('You have earned 50 points')
  })

  it('should reward user based on time spent', async () => {
    const mockResponse = {
      status: 200,
      message: 'Rewarded based on time spent',
      payload: { points: 30, message: 'You have earned 30 points for your time' },
      metadata: null
    }

    mock.onPost(URLS.rewardOnTimeSpent).reply(200, mockResponse)

    const result = await reward.rewardOnTimeSpent()

    expect(result.points).toBe(30)
    expect(result.message).toBe('You have earned 30 points for your time')
  })

  it('should reward user based on shopping', async () => {
    const mockResponse = {
      status: 200,
      message: 'Rewarded based on shopping',
      payload: { points: 100, message: 'You have earned 100 points for shopping' },
      metadata: null
    }

    mock.onPost(URLS.rewardOnShopping).reply(200, mockResponse)

    const result = await reward.rewardOnShopping()

    expect(result.points).toBe(100)
    expect(result.message).toBe('You have earned 100 points for shopping')
  })

  it('should reward user on live chat', async () => {
    const mockResponse = {
      status: 200,
      message: 'Rewarded on live chat',
      payload: { points: 20, message: 'You have earned 20 points for participating in live chat' },
      metadata: null
    }

    mock.onPost(URLS.rewardOnLiveChat).reply(200, mockResponse)

    const result = await reward.rewardOnLiveChat()

    expect(result.points).toBe(20)
    expect(result.message).toBe('You have earned 20 points for participating in live chat')
  })
})
