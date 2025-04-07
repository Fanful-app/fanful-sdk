import axios, { AxiosInstance } from 'axios'
import Admin from '../src/admin'
import { URLS } from '../src/helper/urls'
import type { PaginateParams } from '../typings/global'
import { ClientInterface } from '../typings/client'
import { createMockResponse } from '../src/helper/utils'
import { mockClientData, mockClientsData } from './mocks/client'

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

  test('should delete a specific client', async () => {
    // const mockAxiosDelete = jest.fn().mockResolvedValue({
    //   data: {
    //     payload: mockClientsData
    //   }
    // })
    const payload: Pick<ClientInterface, 'client_id'> = { client_id: 'client123' }
    const result = await adminService.deleteClient(payload)
    // const networkSpy = jest.spyOn(Admin.network, 'delete').mockImplementation(mockAxiosDelete)

    expect(result).toEqual(mockClientData)

    // expect(networkSpy).toHaveBeenCalledWith(URLS.deleteClient({ client_id: 'client123' }))
  })
})
