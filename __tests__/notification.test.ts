import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Notification from '../src/notification'
import { URLS } from '../src/helper/urls'

// const mock = new MockAdapter(axios)
// let notification: Notification

let mock: MockAdapter
let notification: Notification

beforeEach(() => {
  const axiosInstance = axios.create()
  mock = new MockAdapter(axiosInstance)
  notification = new Notification(axiosInstance)
})

// beforeEach(() => {
//   notification = new Notification(axios)
//   mock.reset()
// })

describe('Notification Class', () => {
  it('should fetch notifications', async () => {
    const mockResponse = {
      status: 200,
      message: 'Notifications fetched successfully',
      payload: {
        content: [{ id: '1', message: 'New notification' }],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 1
      },
      metadata: null
    }

    mock.onGet(URLS.getNotifications).reply(200, mockResponse)

    const result = await notification.get({ page: 1, size: 10 })

    expect(result.content).toEqual(mockResponse.payload.content)
    expect(result.totalElements).toBe(1)
    expect(result.totalPages).toBe(1)
  })

  it('should mark notification as seen', async () => {
    const mockResponse = {
      status: 200,
      message: 'Notification marked as seen',
      payload: true,
      metadata: null
    }

    const notificationId = '123'

    mock.onPost(URLS.seenNotification(notificationId)).reply(200, mockResponse)

    const result = await notification.seen({ id: notificationId })

    expect(result).toBe(true)
  })

  it('should mark all notifications as seen', async () => {
    const mockResponse = {
      status: 200,
      message: 'All notifications marked as seen',
      payload: true,
      metadata: null
    }

    mock.onPost(URLS.markAllNotification).reply(200, mockResponse)

    const result = await notification.markAll()

    expect(result).toBe(true)
  })

  it('should register push notification token', async () => {
    const mockResponse = {
      status: 200,
      message: 'Push notification registered successfully',
      payload: true,
      metadata: null
    }

    const fcmToken = { token: 'mock-fcm-token' }

    mock.onPost(URLS.registerPushNotification, fcmToken).reply(200, mockResponse)

    const result = await notification.register(fcmToken)

    expect(result).toBe(true)
  })
})
