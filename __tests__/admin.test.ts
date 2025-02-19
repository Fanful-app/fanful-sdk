import axios, { AxiosInstance } from 'axios'
import Admin from '../src/admin'
import { URLS } from '../src/helper/urls'

describe('Admin Class', () => {
  let adminService: Admin

  beforeEach(() => {
    adminService = new Admin(axios as AxiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should get all clients', async () => {
    mock.onPost(URLS.getClients).reply(200, {
      payload: { message: 'success' }
    })

    const result = await adminService.clients()
    expect(result).toEqual({ message: 'success' })
  })
})
