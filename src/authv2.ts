import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import {
  UserInterface,
  SignInUserInterface,
  SignUpUserInterface,
  UserSessionInterface,
  VerifyUserOtpInterface,
  ResetPasswordInterface,
  ForgotPasswordInterface,
  BasicResponseInterface
} from '../types'

export default class AuthV2 {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof AuthV2.web) {
    AuthV2.web = web
  }

  /**
   * @method getUserSession
   * @returns {Promise<UserSessionInterface>} Get user session
   */
  public getUserSession = async (): Promise<UserSessionInterface> => {
    const { data } = await AuthV2.web.network.get<BasicResponseInterface<UserSessionInterface>>(
      '/session'
    )
    return data.payload
  }

  /**
   * @method signIn
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signInUser = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { error } = await AuthV2.web.supabase.auth.signInWithPassword({
      password: payload.password!,
      phone: payload.phone_number!
    })
    if (error) {
      throw error
    }

    // Get user session from our API
    const session = await this.getUserSession()

    return session
  }

  /**
   * @method signUp
   * @param {SignUpUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Signup a user
   */
  public signUpUser = async (payload: SignUpUserInterface): Promise<UserSessionInterface> => {
    const { data } = await AuthV2.web.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signUpUser,
      payload
    )

    return data.payload
  }

  /**
   * @method verifyUserOtp
   * @param {VerifyUserOtpInterface} payload
   * @returns {Promise<UserSessionInterface>} Verify a user OTP
   */
  public verifyUserOtp = async (payload: VerifyUserOtpInterface): Promise<UserSessionInterface> => {
    const { error } = await AuthV2.web.supabase.auth.verifyOtp({
      type: 'sms',
      token: payload.token!,
      phone: payload.phone_number!
    })

    if (error) {
      throw error
    }

    // Get user session from our API
    const session = await this.getUserSession()

    return session
  }

  /**
   * @method resendOTP
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserInterface>} Resend OTP for a user
   */
  public resendOTP = async (payload: SignInUserInterface): Promise<void> => {
    const { error } = await AuthV2.web.supabase.auth.resend({
      type: 'sms',
      phone: payload.phone_number!
    })

    if (error) {
      throw error
    }
  }

  /**
   * @method forgotPassword
   * @param {ForgotPasswordInterface} payload
   * @returns {Promise<UserInterface>} Request for Forgot Password
   */
  public forgotPassword = async (payload: ForgotPasswordInterface): Promise<void> => {
    const { error } = await AuthV2.web.supabase.auth.signInWithOtp({
      phone: payload.phone_number!,
      options: { channel: 'sms', shouldCreateUser: false }
    })

    if (error) {
      throw error
    }
  }

  /**
   * @method logout
   * @returns {Promise<void>} Logs out a user
   */
  public logout = async (): Promise<void> => {
    const { error } = await AuthV2.web.supabase.auth.signOut({ scope: 'global' })

    if (error) {
      throw error
    }
  }

  /**
   * @method refreshAccessToken
   * @param {Pick<UserSessionInterface, 'refresh_token'>} payload
   * @returns {Promise<UserSessionInterface>} Refresh Access Token
   */
  public refreshAccessToken = async (
    payload: Pick<UserSessionInterface, 'refresh_token'>
  ): Promise<UserSessionInterface> => {
    const { data } = await AuthV2.web.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.refreshAccessToken,
      payload
    )

    return data.payload
  }

  /**
   * @method resetPassword
   * @param {Omit<ResetPasswordInterface, 'confirm_password'>} payload
   * @returns {Promise<UserInterface>} Request for Reset Password
   */
  public resetPassword = async (
    payload: Omit<ResetPasswordInterface, 'confirm_password'>
  ): Promise<UserInterface> => {
    const { data } = await AuthV2.web.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resetPassword,
      payload
    )

    return data.payload
  }
}
