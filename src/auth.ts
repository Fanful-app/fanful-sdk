import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import SessionManager from './helper/session'
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

export default class Auth {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof Auth.web) {
    Auth.web = web
  }

  /**
   * @method signIn
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signIn = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signInUser,
      payload
    )

    // Store the access token
    await SessionManager.setSession(data.payload)

    return data.payload
  }

  /**
   * @method signUp
   * @param {SignUpUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Signup a user
   */
  public signUp = async (payload: SignUpUserInterface): Promise<UserSessionInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signUpUser,
      payload
    )

    return data.payload
  }

  /**
   * @method verifyOtp
   * @param {VerifyUserOtpInterface} payload
   * @returns {Promise<UserSessionInterface>} Verify a user OTP
   */
  public verifyOtp = async (payload: VerifyUserOtpInterface): Promise<UserSessionInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.verifyUserOtp,
      payload
    )

    // Store the access token
    await SessionManager.setSession(data.payload)

    return data.payload
  }

  /**
   * @method resendOTP
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserInterface>} Resend OTP for a user
   */
  public resendOTP = async (payload: SignInUserInterface): Promise<UserInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resendOTP,
      payload
    )

    return data.payload
  }

  /**
   * @method forgotPassword
   * @param {ForgotPasswordInterface} payload
   * @returns {Promise<UserInterface>} Request for Forgot Password
   */
  public forgotPassword = async (payload: ForgotPasswordInterface): Promise<UserInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserInterface>>(
      URLS.forgotPassword,
      payload
    )

    return data.payload
  }

  /**
   * @method logout
   * @returns {Promise<T>} Logs out a user
   */
  public logout = async () => {
    const { data } = await Auth.web.network.post<BasicResponseInterface>(URLS.logoutUser)

    return data.payload
  }

  /**
   * @method refreshAccessToken
   * @param {Pick<UserSessionInterface, 'refresh_token'>} payload
   * @returns {Promise<UserSessionInterface>} Refresh Access Token
   */
  public refreshAccessToken = async (
    payload: Pick<UserSessionInterface, 'refresh_token'>
  ): Promise<UserSessionInterface> => {
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await Auth.web.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resetPassword,
      payload
    )

    return data.payload
  }
}
