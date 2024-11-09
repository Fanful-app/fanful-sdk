import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Auth from '../src/auth'
import { URLS } from '../src/helper/urls'
import {
  SignInUserInterface,
  SignUpUserInterface,
  UserSessionInterface,
  VerifyUserOtpInterface,
  UserInterface,
  ForgotPasswordInterface,
  ResetPasswordInterface
} from '../typings/user'

describe('Auth Class', () => {
  let authService: Auth
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
    authService = new Auth(axios as AxiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  const mockSignInUser: SignInUserInterface = {
    email_address: 'user@example.com',
    password: 'password123'
  }

  const mockSignUpUser: SignUpUserInterface = {
    email_address: 'user@example.com',
    password: 'password123',
    phone_number: '123456789',
    dob: '1990-01-01',
    last_name: 'Doe',
    first_name: 'John'
  }

  const mockVerifyOtp: VerifyUserOtpInterface = {
    email_address: 'user@example.com',
    token: '12345'
  }

  const mockUserSession: UserSessionInterface = {
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    issued_at: Date.now(),
    expires_in: 3600,
    expires_at: Date.now() + 3600 * 1000,
    stream_token: 'stream_token',
    user: null,
    fcm: null,
    client: {
      client_id: 'client_id',
      team_name: 'team_name'
    }
  }

  it('should sign in a user', async () => {
    mock.onPost(URLS.signInUser).reply(200, {
      payload: mockUserSession
    })

    const result = await authService.signIn(mockSignInUser)
    expect(result).toEqual(mockUserSession)
  })

  it('should sign up a user', async () => {
    mock.onPost(URLS.signUpUser).reply(200, {
      payload: mockUserSession
    })

    const result = await authService.signUp(mockSignUpUser)
    expect(result).toEqual(mockUserSession)
  })

  it('should verify user OTP', async () => {
    mock.onPost(URLS.verifyUserOtp).reply(200, {
      payload: mockUserSession
    })

    const result = await authService.verifyOtp(mockVerifyOtp)
    expect(result).toEqual(mockUserSession)
  })

  it('should resend OTP', async () => {
    const mockUser: UserInterface = {
      id: '1',
      email_address: 'user@example.com',
      bio: '',
      dob: '',
      avatar: '',
      ranking: 0,
      country: undefined,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      created_at: '',
      updated_at: '',
      display_name: '',
      phone_number: '',
      is_verified: false,
      reward_points: 0,
      referral_code: '',
      unread_notification_count: 0,
      reward_points_tracker: null
    }

    mock.onPost(URLS.resendOTP).reply(200, {
      payload: mockUser
    })

    const result = await authService.resendOTP(mockSignInUser)
    expect(result).toEqual(mockUser)
  })

  it('should handle forgot password request', async () => {
    const mockUser: UserInterface = {
      id: '1',
      email_address: 'user@example.com',
      bio: '',
      dob: '',
      avatar: '',
      ranking: 0,
      country: undefined,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      created_at: '',
      updated_at: '',
      display_name: '',
      phone_number: '',
      is_verified: false,
      reward_points: 0,
      referral_code: '',
      unread_notification_count: 0,
      reward_points_tracker: null
    }
    const forgotPasswordPayload: ForgotPasswordInterface = { email_address: 'user@example.com' }

    mock.onPost(URLS.forgotPassword).reply(200, {
      payload: mockUser
    })

    const result = await authService.forgotPassword(forgotPasswordPayload)
    expect(result).toEqual(mockUser)
  })

  it('should log out a user', async () => {
    const mockResponse = { success: true }

    mock.onPost(URLS.logoutUser).reply(200, {
      payload: mockResponse
    })

    const result = await authService.logout()
    expect(result).toEqual(mockResponse)
  })

  it('should refresh access token', async () => {
    const refreshPayload = { refresh_token: 'refresh_token' }

    mock.onPost(URLS.refreshAccessToken).reply(200, {
      payload: mockUserSession
    })

    const result = await authService.refreshAccessToken(refreshPayload)
    expect(result).toEqual(mockUserSession)
  })

  it('should reset password', async () => {
    const mockUser: UserInterface = {
      id: '1',
      email_address: 'user@example.com',
      bio: '',
      dob: '',
      avatar: '',
      ranking: 0,
      country: undefined,
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      created_at: '',
      updated_at: '',
      display_name: '',
      phone_number: '',
      is_verified: false,
      reward_points: 0,
      referral_code: '',
      unread_notification_count: 0,
      reward_points_tracker: null
    }
    const resetPasswordPayload: Omit<ResetPasswordInterface, 'confirm_password'> = {
      email_address: 'fanful@gmail.com',
      password: 'newPassword123'
    }

    mock.onPost(URLS.resetPassword).reply(200, {
      payload: mockUser
    })

    const result = await authService.resetPassword(resetPasswordPayload)
    expect(result).toEqual(mockUser)
  })
})
