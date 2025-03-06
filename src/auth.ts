import { AxiosInstance } from 'axios'
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
} from '../types/index'
import { ACCESS_TOKEN_KEY, StorageType } from './helper/storage'

export default class Auth {
  private static network: AxiosInstance
  private static storage: StorageType

  constructor(network: AxiosInstance, storage: StorageType) {
    Auth.network = network
    Auth.storage = storage
  }

  /**
   * @method signIn
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signIn = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { data } = await Auth.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signInUser,
      payload
    )

    // Store the access token
    await Auth.storage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data.payload))

    return data.payload
  }

  /**
   * @method signUp
   * @param {SignUpUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Signup a user
   */
  public signUp = async (payload: SignUpUserInterface): Promise<UserSessionInterface> => {
    const { data } = await Auth.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await Auth.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.verifyUserOtp,
      payload
    )

    // Store the access token
    await Auth.storage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(data.payload))

    return data.payload
  }

  /**
   * @method resendOTP
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserInterface>} Resend OTP for a user
   */
  public resendOTP = async (payload: SignInUserInterface): Promise<UserInterface> => {
    const { data } = await Auth.network.post<BasicResponseInterface<UserInterface>>(
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
    const { data } = await Auth.network.post<BasicResponseInterface<UserInterface>>(
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
    const { data } = await Auth.network.post<BasicResponseInterface>(URLS.logoutUser)

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
    const { data } = await Auth.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await Auth.network.post<BasicResponseInterface<UserInterface>>(
      URLS.resetPassword,
      payload
    )

    return data.payload
  }
}
