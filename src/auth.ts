import { BasicResponseInterface } from '@typings/global'
import {
  ForgotPasswordInterface,
  SignInUserInterface,
  SignUpUserInterface,
  UpdateProfileInterface,
  UserInterface,
  UserSessionInterface,
  VerifyUserOtpInterface
} from '@typings/user'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import { getAssetMeta } from './helper/utils'

export default class Auth {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method signInUser
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Sign in a user
   */
  public signInUser = async (payload: SignInUserInterface): Promise<UserSessionInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.signInUser,
      payload
    )

    return data.payload
  }

  /**
   * @method signUpUser
   * @param {SignUpUserInterface} payload
   * @returns {Promise<UserSessionInterface>} Signup a user
   */
  public signUpUser = async (payload: SignUpUserInterface): Promise<UserSessionInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
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
    const { data } = await this.network.post<BasicResponseInterface<UserSessionInterface>>(
      URLS.verifyUserOtp,
      payload
    )

    return data.payload
  }

  /**
   * @method resendOTP
   * @param {SignInUserInterface} payload
   * @returns {Promise<UserInterface>} Resend OTP for a user
   */
  public resendOTP = async (payload: SignInUserInterface): Promise<UserInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<UserInterface>>(
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
    const { data } = await this.network.post<BasicResponseInterface<UserInterface>>(
      URLS.forgotPassword,
      payload
    )

    return data.payload
  }

  /**
   * @method updateProfile
   * @param {UpdateProfileInterface} payload
   * @returns {Promise<UserInterface>} Updates a user profile
   */
  public updateProfile = async (payload: UpdateProfileInterface): Promise<UserInterface> => {
    const form = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'avatar' && !value.includes('https://')) {
        const { ext, name } = getAssetMeta(value)

        //@ts-ignore
        form.append('files', {
          uri: value,
          type: 'image/jpeg',
          name: `${name}.${ext}`
        })
      } else {
        form.append(key, value)
      }
    })

    const { data } = await this.network.put<BasicResponseInterface<UserInterface>>(
      URLS.updateProfile,
      form
    )

    return data.payload
  }

  /**
   * @method logoutUser
   * @returns {Promise<T>} Logs out a user
   */
  public logoutUser = async () => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.logoutUser)

    return data.payload
  }
}
