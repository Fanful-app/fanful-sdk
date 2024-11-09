import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Notification from '../src/notification'
import { PaginateParams, PaginateResult } from '../typings/global'
import type { NotificationInterface, FcmTokenInterface } from '../typings/notification'
import { NotificationType } from '../typings/enums'
import { URLS } from '../src/helper/urls'

describe('Notification Class', () => {
  let notificationService: Notification
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
    notificationService = new Notification(axios as AxiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should fetch notifications list', async () => {
    const mockNotifications: PaginateResult<NotificationInterface> = {
      docs: [
        {
          id: '1',
          message: 'New Comment',
          post_id: '123',
          is_seen: false,
          type: NotificationType.COMMENTED,
          created_at: Date.now(),
          updated_at: Date.now(),
          post: { id: '123', media_url: 'https://example.com/image.png' }
        }
      ],
      total: 1,
      limit: 10,
      page: 1,
      pages: 1,
      offset: 0,
      totalDocs: 0,
      totalPages: 0,
      hasPrevPage: false,
      hasNextPage: false,
      pagingCounter: 0
    }

    mock.onGet(URLS.getNotifications).reply(200, {
      payload: mockNotifications
    })

    const params: PaginateParams = { page: 1 }
    const notifications = await notificationService.get(params)
    expect(notifications).toEqual(mockNotifications)
  })

  it('should mark a notification as seen', async () => {
    const mockNotificationId = '1'
    const mockResponse = { success: true }

    mock.onPost(URLS.seenNotification(mockNotificationId)).reply(200, {
      payload: mockResponse
    })

    const result = await notificationService.seen({ id: mockNotificationId })
    expect(result).toEqual(mockResponse)
  })

  it('should mark all notifications as seen', async () => {
    const mockResponse = { success: true }

    mock.onPost(URLS.markAllNotification).reply(200, {
      payload: mockResponse
    })

    const result = await notificationService.markAll()
    expect(result).toEqual(mockResponse)
  })

  it('should register a push notification', async () => {
    const mockPayload: FcmTokenInterface = {
      device_id: 'device123',
      is_active: true,
      device_type: 'android',
      device_token: 'token123'
    }
    const mockResponse = { success: true }

    mock.onPost(URLS.registerPushNotification).reply(200, {
      payload: mockResponse
    })

    const result = await notificationService.register(mockPayload)
    expect(result).toEqual(mockResponse)
  })
})
