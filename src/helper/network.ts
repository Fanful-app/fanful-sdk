import axios, { AxiosError } from 'axios'
import { FanfulSdkOptions } from '@typings/global'

const envconfig: Record<NonNullable<FanfulSdkOptions['mode']>, string> = {
  test: 'https://phoenix-fanful-2d74e42e73ee.herokuapp.com',
  production: 'https://fanful-backend-33d52a64526c.herokuapp.com'
}

export const createNetwork = (params: FanfulSdkOptions) => {
  // Set config defaults when creating the instance
  const network = axios.create({ baseURL: `${envconfig[params.mode || 'test']}/api/v1` })

  // Add a request interceptor
  network.interceptors.request.use(
    async (config) => {
      config.headers.set('x-fanful-client-id', params.secrete_key)
      config.headers.set('x-fanful-secrete-key', params.secrete_key)
      return config
    },
    (error: AxiosError) => {
      reportError(error?.response?.data as Error)
      return Promise.reject(error?.response?.data as Error)
    }
  )

  // Add a response interceptor
  network.interceptors.response.use(
    async (response) => response,
    async (error: AxiosError) => {
      const response = error.response
      reportError(response?.data as Error)
      return Promise.reject(response?.data as Error)
    }
  )

  return network
}
