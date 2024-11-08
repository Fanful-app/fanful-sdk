import Auth from '../src/auth'
import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import { URLS } from '../src/helper/urls'
import {
  SignInUserInterface,
  SignUpUserInterface,
  UserSessionInterface,
  VerifyUserOtpInterface,
  ResetPasswordInterface,
  ForgotPasswordInterface
} from '../typings/user'

const mockSignInUser: SignInUserInterface = {
  email_address: 'user@example.com',
  password: 'password123'
}

const mockSignUpUser: SignUpUserInterface = {
  email_address: 'user@example.com',
  password: 'password123',
  phone_number: '',
  dob: '',
  last_name: '',
  first_name: ''
}

const mockVerifyOtp: VerifyUserOtpInterface = {
  email_address: 'user@example.com',
  token: '12345'
}

const mockUserSession: UserSessionInterface = {
  refresh_token: 'refresh_token',
  access_token: '',
  issued_at: 0,
  expires_in: 0,
  expires_at: 0,
  stream_token: '',
  user: null,
  fcm: null,
  client: {
    client_id: '',
    team_name: ''
  }
}

describe('Auth class', () => {
  let auth: Auth
  let mockAxios: AxiosMockAdapter

  beforeEach(() => {
    mockAxios = new AxiosMockAdapter(axios)
    auth = new Auth(axios)
  })

  afterEach(() => {
    mockAxios.reset()
  })

  it('should sign in a user', async () => {
    // Setup mock response
    mockAxios.onPost(URLS.signInUser).reply(200, {
      success: true,
      payload: mockUserSession
    })

    const response = await auth.signIn(mockSignInUser)

    expect(response).toEqual(mockUserSession)
    expect(mockAxios.history.post[0].url).toBe(URLS.signInUser)
  })

  it('should sign up a user', async () => {
    mockAxios.onPost(URLS.signUpUser).reply(200, {
      success: true,
      payload: mockUserSession
    })

    const response = await auth.signUp(mockSignUpUser)

    expect(response).toEqual(mockUserSession)
    expect(mockAxios.history.post[0].url).toBe(URLS.signUpUser)
  })

  it('should verify user OTP', async () => {
    mockAxios.onPost(URLS.verifyUserOtp).reply(200, {
      success: true,
      payload: mockUserSession
    })

    const response = await auth.verifyOtp(mockVerifyOtp)

    expect(response).toEqual(mockUserSession)
    expect(mockAxios.history.post[0].url).toBe(URLS.verifyUserOtp)
  })

  it('should resend OTP to user', async () => {
    mockAxios.onPost(URLS.resendOTP).reply(200, {
      success: true,
      payload: { user_id: '1', email: 'user@example.com' }
    })

    const response = await auth.resendOTP(mockSignInUser)

    expect(response.user_id).toBe('1')
    expect(mockAxios.history.post[0].url).toBe(URLS.resendOTP)
  })

  it('should handle forgot password', async () => {
    const mockForgotPassword: ForgotPasswordInterface = {
      email_address: 'user@example.com'
    }

    mockAxios.onPost(URLS.forgotPassword).reply(200, {
      success: true,
      payload: { user_id: '1', email: 'user@example.com' }
    })

    const response = await auth.forgotPassword(mockForgotPassword)

    expect(response.user_id).toBe('1')
    expect(mockAxios.history.post[0].url).toBe(URLS.forgotPassword)
  })

  it('should logout a user', async () => {
    mockAxios.onPost(URLS.logoutUser).reply(200, {
      success: true,
      payload: {}
    })

    const response = await auth.logout()

    expect(response).toEqual({})
    expect(mockAxios.history.post[0].url).toBe(URLS.logoutUser)
  })

  it('should refresh access token', async () => {
    const mockRefreshPayload = { refresh_token: 'refresh_token' }

    mockAxios.onPost(URLS.refreshAccessToken).reply(200, {
      success: true,
      payload: mockUserSession
    })

    const response = await auth.refreshAccessToken(mockRefreshPayload)

    expect(response).toEqual(mockUserSession)
    expect(mockAxios.history.post[0].url).toBe(URLS.refreshAccessToken)
  })

  it('should reset password', async () => {
    const mockResetPassword: Omit<ResetPasswordInterface, 'confirm_password'> = {
      email_address: 'user@example.com',
      password: 'newpassword123'
    }

    mockAxios.onPost(URLS.resetPassword).reply(200, {
      success: true,
      payload: { user_id: '1', email: 'user@example.com' }
    })

    const response = await auth.resetPassword(mockResetPassword)

    expect(response.user_id).toBe('1')
    expect(mockAxios.history.post[0].url).toBe(URLS.resetPassword)
  })
})
