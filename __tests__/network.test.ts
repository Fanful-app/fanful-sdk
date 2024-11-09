import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { FanfulSdkOptions } from '../typings/global'
import { createNetwork } from '../src/helper/network'
import { reportError } from '../src/helper/utils'

jest.mock('../src/helper/utils', () => ({
  reportError: jest.fn()
}))

describe('createNetwork', () => {
  let mock: MockAdapter
  let network: ReturnType<typeof createNetwork>
  const options: FanfulSdkOptions = {
    client_id: 'test-client-id',
    secrete_key: 'test-secrete-key',
    mode: 'test'
  }

  beforeEach(() => {
    mock = new MockAdapter(axios)
    network = createNetwork(options)
  })

  afterEach(() => {
    mock.reset()
    jest.clearAllMocks()
  })

  it('should set baseURL correctly based on mode', () => {
    expect(network.defaults.baseURL).toBe(
      'https://phoenix-fanful-2d74e42e73ee.herokuapp.com/api/v1'
    )
  })

  it('should add custom headers from FanfulSdkOptions in requests', async () => {
    mock.onGet('/test').reply(200, { success: true })

    const response = await network.get('/test')

    expect(response.data).toEqual({ success: true })
    const headers = mock.history.get[0].headers
    if (headers) {
      expect(headers['x-fanful-client-id']).toBe(options.client_id)
      expect(headers['x-fanful-secrete-key']).toBe(options.secrete_key)
    }
  })

  it('should call reportError and reject on request error', async () => {
    mock.onGet('/test').reply(400, { message: 'Bad Request' })

    try {
      await network.get('/test')
    } catch (error) {
      expect(reportError).toHaveBeenCalledWith({ message: 'Bad Request' })
    }
  })

  it('should call reportError and reject on response error', async () => {
    mock.onGet('/test').reply(500, { message: 'Internal Server Error' })

    try {
      await network.get('/test')
    } catch (error) {
      expect(reportError).toHaveBeenCalledWith({ message: 'Internal Server Error' })
    }
  })

  it('should not call reportError on a successful response', async () => {
    mock.onGet('/test').reply(200, { success: true })

    const response = await network.get('/test')

    expect(response.data).toEqual({ success: true })
    expect(reportError).not.toHaveBeenCalled()
  })
})
