import axios, { AxiosError } from 'axios'
import { FanfulSdkOptions } from '../../types'
import { createClient } from '@supabase/supabase-js'

import { reportError } from './utils'
import SessionManager from './session'
import { envconfig } from './constants'

export const createNetwork = (params: FanfulSdkOptions) => {
  // Set config defaults when creating the instance
  const network = axios.create({
    baseURL: `${envconfig[params.mode || 'test']}/api/v${params.version || 2}`
  })

  const supabase = createClient(
    `${envconfig[params.mode || 'test'].SUPABASE_DB_URL}`,
    `${envconfig[params.mode || 'test'].SUPABASE_ANON_PUB_KEY}`,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: SessionManager,
        detectSessionInUrl: false
      }
    }
  )

  // Add a request interceptor
  network.interceptors.request.use(
    async (config) => {
      const session = await SessionManager.getSession()
      config.headers.set('x-fanful-client-id', params.client_id)
      config.headers.setAuthorization(session?.access_token || '')
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

  return { network, supabase }
}
