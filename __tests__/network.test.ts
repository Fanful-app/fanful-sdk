import axios, { AxiosError } from 'axios'
import { FanfulSdkOptions } from '../typings/global'
import { beforeEach } from 'node:test'
import { createNetwork } from '../src/helper/network'

jest.mock('axios')

const mocked_axios = axios as jest.Mocked<typeof axios>
const baseURL = 'https://phoenix-fanful-2d74e42e73ee.herokuapp.com'

describe('createNetwork', () => {
  let fanfulSdkOptions: FanfulSdkOptions

  beforeEach(() => {
    fanfulSdkOptions = {
      mode: 'test',
      secrete_key: 'test_key',
      client_id: 'fanful-client_id'
    }
    mocked_axios.create.mockReturnThis()
  })

  it('should set correct headers in request', async () => {
    const network = createNetwork(fanfulSdkOptions)
    mocked_axios.interceptors.request.use((config) => config)

    expect(mocked_axios.interceptors.request.use).toHaveBeenCalledWith(`${baseURL}/api/v1`, {
      'x-fanful-client-id': 'client_id',
      'x-fanful-secrete-key': 'secrete_key'
    })

    await network.get('/test-endpoint')
    expect(mocked_axios.interceptors.request.use).toHaveBeenCalled()
  })

  it('should handle successful response', async () => {
    const network = createNetwork(fanfulSdkOptions)
    mocked_axios.interceptors.request.use((response) => response)
    mocked_axios.get.mockResolvedValue({
      data: { payload: [], metadata: 'string', status: 200, message: 'string' }
    })
    const response = await network.get('/test-endpoint')
    expect(response.data).toEqual({ message: 'success' })
  })

  it('should handle errors and reject with error response', async () => {
    const network = createNetwork(fanfulSdkOptions)
    const error: AxiosError = {
      isAxiosError: true,
      response: {
        status: 400,
        data: { status: 500, message: 'error', error: 'strings of errors' }
      }
    } as AxiosError

    try {
      await network.get('/test-endpoint')
    } catch (err) {
      expect(err).toEqual({ status: 500, message: 'error', error: 'strings of errors' })
    }
  })
})
