import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Raffle from '../src/raffle'
import { URLS } from '../src/helper/urls'
import { BasicResponseInterface, PaginateParams, PaginateResult } from '../typings/global'
import type { RaffleEntryInterface, RaffleFilterInterface } from '../typings/reward'
import { RaffleEntryStatusType } from '../typings/enums'

describe('Raffle class', () => {
  let mock: MockAdapter
  let raffle: Raffle

  beforeEach(() => {
    const axiosInstance = axios.create()
    mock = new MockAdapter(axiosInstance)
    raffle = new Raffle(axiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should fetch a list of raffles with the get method', async () => {
    const mockResponse: BasicResponseInterface<PaginateResult<RaffleEntryInterface>> = {
      status: 200,
      message: 'Success',
      payload: {
        docs: [
          {
            id: 'raffle1',
            title: 'Sample Raffle',
            points: 50,
            image_url: 'https://example.com/image.jpg',
            close_date: '2024-12-31',
            description: 'A sample raffle',
            client_app_id: 'app123',
            total_no_of_entries: 100,
            user_id: 'user123',
            raffle_id: 'raffle1',
            is_closed: false,
            no_of_entries: 5,
            status: RaffleEntryStatusType.PENDING
          } as RaffleEntryInterface
        ],
        limit: 10,
        offset: 0,
        totalDocs: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 1,
        page: 1,
        prevPage: null,
        nextPage: null
      },
      metadata: null
    }

    const params: PaginateParams & RaffleFilterInterface = {
      filter_type: 'raffles',
      page: 1
    }

    mock.onGet(URLS.getRaffles(params.filter_type)).reply(200, mockResponse)

    const result = await raffle.get(params)
    expect(result).toEqual(mockResponse.payload)
  })

  it('should join a raffle with the join method', async () => {
    const raffleId = 'raffle123'
    const mockResponse: BasicResponseInterface<RaffleEntryInterface> = {
      status: 200,
      message: 'Raffle joined successfully',
      payload: {
        id: raffleId,
        title: 'Joined Raffle',
        points: 100,
        image_url: 'https://example.com/joined-raffle.jpg',
        close_date: '2024-11-30',
        description: 'Join this exciting raffle!',
        client_app_id: 'app123',
        total_no_of_entries: 200,
        user_id: 'user123',
        raffle_id: raffleId,
        is_closed: false,
        no_of_entries: 1,
        status: RaffleEntryStatusType.PENDING
      } as RaffleEntryInterface,
      metadata: null
    }

    mock.onPost(URLS.joinRaffle(raffleId)).reply(200, mockResponse)

    const result = await raffle.join(raffleId)
    expect(result).toEqual(mockResponse.payload)
  })

  it('should confirm a raffle win with the won method', async () => {
    const raffleId = 'raffle123'
    const email_address = 'test@example.com'
    const mockResponse: BasicResponseInterface = {
      status: 200,
      message: 'Congratulations, you won!',
      payload: null,
      metadata: null
    }

    mock.onPost(URLS.wonRaffle(raffleId), { email_address }).reply(200, mockResponse)

    const result = await raffle.won({ raffleId, email_address })
    expect(result).toEqual(mockResponse.payload)
  })
})
