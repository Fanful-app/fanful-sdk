import axios, { AxiosInstance } from 'axios'
import User from '../src/user'
import { URLS } from '../src/helper/urls'
import { PaginateResult, BasicResponseInterface, RewardMetadata } from '../typings/global'
import {
  UserReferralInterface,
  UserSessionInterface,
  UserProfileFollowersOrFollowingInterface,
  UserRankInterface
} from '../typings/user'

describe('User Class', () => {
  let userInstance: User

  beforeAll(() => {
    userInstance = new User(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  afterAll(() => {
    mock.restore()
  })

  test('getReferrals returns list of referrals', async () => {
    const mockResponse: BasicResponseInterface<PaginateResult<UserReferralInterface>> = {
      payload: {
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        docs: [],
        offset: 0,
        totalDocs: 0,
        totalPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 0
      },
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onGet(URLS.getReferrals).reply(200, mockResponse)

    const result = await userInstance.getReferrals({ page: 1 })
    expect(result).toEqual(mockResponse.payload)
  })

  test('getProfile returns user profile details', async () => {
    const userId = '123'
    const mockResponse: BasicResponseInterface<UserSessionInterface['user']> = {
      payload: {
        id: userId,
        username: 'testuser',
        avatar: 'test-avatar.jpg'
      } as UserSessionInterface['user'],
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onGet(URLS.getUserProfile(userId)).reply(200, mockResponse)

    const result = await userInstance.getProfile(userId)
    expect(result).toEqual(mockResponse.payload)
  })

  test('getFollowers returns profile followers', async () => {
    const params = { page: 1, username: 'testuser', user_id: '123', is_following_page: true }
    const mockResponse: BasicResponseInterface<
      PaginateResult<UserProfileFollowersOrFollowingInterface>
    > = {
      payload: {
        total: 0,
        page: 1,
        limit: 10,
        docs: [
          {
            id: '12345',
            username: 'abiola',
            avatar: 'https://abi.com/image',
            display_name: 'abiola'
          }
        ],
        offset: 0,
        totalDocs: 0,
        totalPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 0
      },
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onGet(URLS.getProfileFollowersOrFollowing(params)).reply(200, mockResponse)

    const result = await userInstance.getFollowers(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('follow sends follow request and returns reward metadata', async () => {
    const params = { id: '123', is_following: true, number_of_following: 5 }
    const mockResponse: BasicResponseInterface<RewardMetadata> = {
      payload: {
        message: 'Rewarded successfully',
        isMaxPointForTheDay: false
      },
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onPut(URLS.followAndUnFollow(params)).reply(200, mockResponse)

    const result = await userInstance.follow(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('updateProfile updates user profile', async () => {
    const payload = { username: 'newUserName', avatar: 'new-avatar.jpg' }
    const date = '2024-11-09T04:04:38.797Z' as unknown as Date
    const mockResponse: BasicResponseInterface<UserSessionInterface['user']> = {
      payload: {
        id: '980371',
        bio: 'i am a boy',
        dob: '31-03-1998',
        avatar: 'user.png',
        ranking: 30,
        country: 'Nigeria',
        username: 'MiltonBlack',
        password: '123456789',
        first_name: 'Azibapu',
        last_name: 'Milton',
        display_name: 'MiltonBlack',
        phone_number: '+2349037289192',
        created_at: '2024',
        updated_at: '2024',
        is_verified: true,
        reward_points: 160,
        referral_code: 'ProjectBaby',
        unread_notification_count: 15,
        reward_points_tracker: {
          like_points: 78,
          follow_points: 92,
          comment_points: 40,
          open_app_points: 99,
          live_chat_points: 38,
          view_score_points: 50,
          time_spent_points: 102,
          create_post_points: 70,
          time_spent_timestamp: date
        }
      },
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onPut(URLS.updateProfile).reply(200, mockResponse)

    const result = await userInstance.updateProfile(payload)
    expect(result).toEqual(mockResponse.payload)
  })

  test('delete removes user account data', async () => {
    const mockResponse = { payload: true }
    mock.onDelete(URLS.deleteUser).reply(200, mockResponse)

    const result = await userInstance.delete()
    expect(result).toEqual(mockResponse.payload)
  })

  test('getRankPoints returns a list of rank points', async () => {
    const mockResponse: BasicResponseInterface<
      PaginateResult<{ user: UserRankInterface; leader_board: PaginateResult<UserRankInterface> }>
    > = {
      payload: {
        data: [
          {
            user: {
              username: 'user1',
              avatar: 'avatar.jpg',
              total_reward_points: 150,
              leader_board_position: 1
            },
            leader_board: {
              docs: [],
              limit: 0,
              offset: 0,
              totalDocs: 0,
              totalPages: 0,
              hasPrevPage: false,
              hasNextPage: false,
              pagingCounter: 0
            }
          }
        ],
        total: 1,
        page: 1,
        limit: 10,
        docs: [],
        offset: 0,
        totalDocs: 0,
        totalPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 0
      },
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onGet(URLS.getRankPoints).reply(200, mockResponse)

    const result = await userInstance.getRankPoints({ page: 1 })
    expect(result).toEqual(mockResponse.payload)
  })
})
