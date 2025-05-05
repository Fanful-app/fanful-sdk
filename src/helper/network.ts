import axios, { AxiosError } from 'axios'
import capitalize from 'lodash/capitalize'
import { FanfulSdkOptions } from '../../types'
import { createClient } from '@supabase/supabase-js'

import { reportError } from './utils'
import SessionManager from './session'
import { envconfig } from './constants'

export const createV1Network = (params: FanfulSdkOptions) => {
  // Set config defaults when creating the instance
  const network = axios.create({
    baseURL: `${envconfig[params.mode || 'test']}/api/v${params.version || 2}`
  })

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

      if (response?.status === 401) {
        SessionManager.removeItem()
        params?.onClearSession?.()
      }

      reportError(response?.data as Error)
      return Promise.reject(response?.data as Error)
    }
  )

  return { network }
}

export const createV2Network = (params: FanfulSdkOptions) => {
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
      // get the JWT token out of it
      const session = await supabase.auth.getSession()
      const token_type = session.data.session?.token_type
      const access_token = session.data.session?.access_token
      const authorization = access_token ? `${capitalize(token_type)} ${access_token}` : ''

      config.headers.setAuthorization(authorization)
      config.headers.set('x-fanful-client-id', params.client_id)
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

      if (response?.status === 401) {
        try {
          const { data, error: __error } = await supabase.auth.refreshSession()

          if (data.session === null || __error) {
            // If we fail to resolve the session after receiving an unauthorized error from the server, sign the user out of the app.
            SessionManager.removeItem()
            params?.onClearSession?.()
          }
        } catch (_error) {
          // If we fail to resolve the session after receiving an unauthorized error from the server, sign the user out of the app.
          SessionManager.removeItem()
          params?.onClearSession?.()
        }
      }

      reportError(response?.data as Error)
      return Promise.reject(response?.data as Error)
    }
  )

  return { network, supabase }
}
