import axios, { AxiosError, AxiosInstance } from 'axios'
import { createNetwork } from '../src/helper/network'
import { FanfulSdkOptions } from '../typings/global'
import { beforeEach } from 'node:test'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const baseURL = 'https://phoenix-fanful-2d74e42e73ee.herokuapp.com'

describe('createNetwork', () => {
  let fanfulSdkOptions: FanfulSdkOptions

  beforeEach(() => {
    fanfulSdkOptions = {
      client_id: 'fanful-client_id',
      secrete_key: 'test_key',
      mode: 'test'
    }
    mockedAxios.create.mockReturnValue(mockedAxios)
  })

  it('should set correct headers in request', async () => {
    const network = createNetwork(fanfulSdkOptions) as AxiosInstance

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL,
      headers: {
        'x-fanful-client-id': fanfulSdkOptions.client_id,
        'x-fanful-secrete-key': fanfulSdkOptions.secrete_key
      }
    })

    mockedAxios.get.mockResolvedValue({ data: { message: 'success' } })
    const response = await network.get('/test-endpoint')
    expect(response.data).toEqual({ message: 'success' })
  })

  it('should handle successful response', async () => {
    const network = createNetwork(fanfulSdkOptions)
    mockedAxios.get.mockResolvedValue({
      data: { payload: [], metadata: 'string', status: 200, message: 'success' }
    })
    const response = await network.get('/test-endpoint')
    expect(response.data).toEqual({
      payload: [],
      metadata: 'string',
      status: 200,
      message: 'success'
    })
  })

  it('should handle errors and reject with error response', async () => {
    const network = createNetwork(fanfulSdkOptions)
    const error = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { status: 500, message: 'error', error: 'strings of errors' }
      }
    } as AxiosError

    mockedAxios.get.mockRejectedValue(error)

    try {
      await network.get('/test-endpoint')
    } catch (err) {
      expect((err as AxiosError).response?.data).toEqual({
        status: 500,
        message: 'error',
        error: 'strings of errors'
      })
    }
  })
})
