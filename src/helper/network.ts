import axios, { AxiosError } from 'axios'
import { FanfulSdkOptions } from '@typings/global'
import { reportError } from './utils'

const envconfig: Record<NonNullable<FanfulSdkOptions['mode']>, string> = {
  test: 'https://fanful-app-e67ec6957e56.herokuapp.com',
  production: 'https://fanful-app-e67ec6957e56.herokuapp.com'
}

export const createNetwork = (params: FanfulSdkOptions) => {
  // Set config defaults when creating the instance
  const network = axios.create({ baseURL: `${envconfig[params.mode || 'test']}/api/v1` })

  // Add a request interceptor
  network.interceptors.request.use(
    async (config) => {
      config.headers.setAuthorization(params.jwt_token || '')
      config.headers.set('x-fanful-client-id', params.client_id)
      config.headers.set('x-fanful-secret-key', params.secret_key)
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
