import axios from 'axios'
import FanfulSdk from '../src'
import MockAdapter from 'axios-mock-adapter'
import { Country } from '../typings/user'
import { BasicResponseInterface } from '../typings/global'
import { URLS } from '../src/helper/urls'

describe('getCountries Method', () => {
  let mock: MockAdapter
  const sdk = new FanfulSdk({ client_id: '', secrete_key: '' })

  const mockCountries: Country[] = [
    {
      name: 'Nigeria',
      cca2: 'NG',
      cca3: 'NGA',
      flag: '🇳🇬',
      dialCode: '+234'
    },
    {
      name: 'United States',
      cca2: 'US',
      cca3: 'USA',
      flag: '🇺🇸',
      dialCode: '+1'
    }
  ]

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  afterAll(() => {
    mock.restore()
  })

  it('should return a list of countries successfully', async () => {
    mock.onGet(URLS.getCountries).reply(200, { payload: mockCountries })

    const countries = await sdk.getCountries()
    expect(countries).toEqual(mockCountries)
  }, 10000)

  it('should handle errors correctly if the request fails', async () => {
    mock.onGet(URLS.getCountries).reply(500, { message: 'Internal Server Error' })

    try {
      await sdk.getCountries()
    } catch (error: any) {
      expect(error.response?.data.message).toBe('Internal Server Error')
    }
  })
})