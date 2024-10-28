import axios, { AxiosError, AxiosInstance } from 'axios'
import FanfulSdk from '../src/index'
import { URLS } from '../src/helper/urls'
import type { BasicResponseInterface, PaginateParams } from '../typings/global'
import type { Country } from '../typings/user'
import type { PostFilterInterface } from '../typings/post'
import { PostmockData, PostsmockData } from '../src/mock/post'
import { FanfulSdkMode, FilterType } from '../enums/index'
import { createNetwork } from './network.test'

jest.mock('../src/helper/network', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockAxios = axios as jest.Mocked<typeof axios>
// const mockAxiosInstance = axios.create() as jest.Mocked<AxiosInstance>
// ;(createNetwork as jest.Mock).mockReturnValue(mockAxiosInstance)

describe('FanfulSdk', () => {
  let fanfulSdk: FanfulSdk
  mockAxios.interceptors.request.use(
    async (config) => {
      config.headers.set('x-fanful-client-id', 'params.client_id')
      config.headers.set('x-fanful-secrete-key', 'params.secrete_key')
      return config
    },
    (error: AxiosError) => {
      reportError(error?.response?.data as Error)
      return Promise.reject(error?.response?.data as Error)
    }
  )
  const options = {
    mode: FanfulSdkMode.TEST,
    secrete_key: 'test_key',
    client_id: 'fanful-client_id'
  }

  beforeEach(() => {
    fanfulSdk = new FanfulSdk(options)
    console.log(fanfulSdk)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getPosts', () => {
    it('should fetch posts with correct params', async () => {
      mockAxios.get.mockResolvedValue({ data: PostsmockData })
      
      // jest.spyOn(FanfulSdk.test_network, 'get').mockResolvedValueOnce(PostsmockData)

      const params: PaginateParams & PostFilterInterface = { page: 1, filter_type: 'Recent' }
      const response = await fanfulSdk.getPosts(params)

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getPosts, { params })
      expect(response).toEqual(PostsmockData.payload)
    })

    it('should handle API errors when fetching posts', async () => {
      mockAxios.get.mockRejectedValue(new Error('Network Error'))

      const params = { page: 1, filter_type: FilterType.Recent }

      await expect(fanfulSdk.getPosts(params)).rejects.toThrow('Network Error')
    })
  })

  describe('getCountries', () => {
    it('should fetch countries', async () => {
      const mockData: BasicResponseInterface<Country[]> = {
        payload: [
          { name: 'Nigeria', cca2: 'string', cca3: 'string', flag: 'string', dialCode: 'string' }
        ],
        metadata: null,
        status: 0,
        message: ''
      }

      mockAxios.get.mockResolvedValue({ data: mockData })

      const response = await fanfulSdk.getCountries()

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getCountries)
      expect(response).toEqual(mockData.payload)
    })
  })

  describe('getPost', () => {
    it('should fetch a single post by ID', async () => {
      const postId = '123'

      mockAxios.get.mockResolvedValue({ data: PostmockData })

      const response = await fanfulSdk.getPost(postId)

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getPost(postId))
      expect(response).toEqual(PostmockData.payload)
    })
  })

  describe('getReferrals', () => {
    it('should fetch referrals with params', async () => {
      const mockData = {
        payload: {
          items: [{ id: 'user1', referral_code: '12345' }],
          total: 1,
          page: 1,
          limit: 10
        }
      }

      mockAxios.get.mockResolvedValue({ data: mockData })

      const params: PaginateParams = { page: 1 }
      const response = await fanfulSdk.getReferrals(params)

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getReferrals, { params })
      expect(response).toEqual(mockData.payload)
    })
  })

  describe('getFanRewardPoints', () => {
    it('should fetch fan reward points', async () => {
      const mockData = {
        payload: {
          daily: [{ id: 'point1', points: 50 }],
          continues: [{ id: 'point2', points: 100 }]
        }
      }

      mockAxios.get.mockResolvedValue({ data: mockData })

      const response = await fanfulSdk.getFanRewardPoints()

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getFanRewardPoints)
      expect(response).toEqual(mockData.payload)
    })
  })

  describe('getShops', () => {
    it('should fetch a list of shops', async () => {
      const mockData = {
        payload: { id: 'shop1', name: 'Test Shop' }
      }

      mockAxios.get.mockResolvedValue({ data: mockData })

      const response = await fanfulSdk.getShops()

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getShops)
      expect(response).toEqual(mockData.payload)
    })
  })

  describe('getComment', () => {
    it('should fetch comments for a post', async () => {
      const postId = 'post123'
      const mockData = {
        payload: {
          items: [{ id: 'comment1', post_id: postId, content: 'Test Comment' }],
          total: 1,
          page: 1,
          limit: 10
        }
      }

      mockAxios.get.mockResolvedValue({ data: mockData })

      const response = await fanfulSdk.getComment({ post_id: postId, page: 1 })

      expect(mockAxios.get).toHaveBeenCalledWith(URLS.getComment, {
        params: { post_id: postId, page: 1 }
      })
      expect(response).toEqual(mockData.payload)
    })
  })
})
