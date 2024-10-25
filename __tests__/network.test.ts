import axios, { AxiosError } from 'axios'
import { FanfulSdkOptions } from '../typings/global'

const envconfig: Record<NonNullable<FanfulSdkOptions['mode']>, string> = {
  test: 'https://phoenix-fanful-2d74e42e73ee.herokuapp.com',
  production: 'https://fanful-backend-33d52a64526c.herokuapp.com'
}

export const createNetwork = (
  params: FanfulSdkOptions = {
    mode: 'test',
    client_id: 'fanful-client_id',
    secrete_key: 'fanful-secrete_key'
  }
) => {
  const network = axios.create({ baseURL: `${envconfig[params.mode || 'test']}/api/v1` })

  network.interceptors.request.use(
    async (config) => {
      config.headers.set('x-fanful-client-id', params.client_id)
      config.headers.set('x-fanful-secrete-key', params.secrete_key)
      return config
    },
    (error: AxiosError) => {
      reportError(error?.response?.data as Error)
      return Promise.reject(error?.response?.data as Error)
    }
  )

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
