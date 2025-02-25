import axios, { AxiosInstance } from 'axios'
import Admin from '../src/admin'
import { URLS } from '../src/helper/urls'
import type { PaginateParams } from '../typings/global'
import { ClientInterface } from '../typings/client'
import { createMockResponse } from '../src/helper/utils'
import { mockClientsData } from './mocks/client'

describe('Admin Class', () => {
  let adminService: Admin

  beforeEach(() => {
    adminService = new Admin(axios as AxiosInstance)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should get all clients', async () => {
    const mockResponse = createMockResponse<ClientInterface>(mockClientsData)

    mock.onGet(URLS.getClients({})).reply(200, mockResponse)

    const params: PaginateParams = { page: 1 }
    const result = await adminService.clients(params)

    expect(result).toEqual(mockResponse.payload)
  })
})
