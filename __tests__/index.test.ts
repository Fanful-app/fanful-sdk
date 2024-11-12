import FanfulSdk from '../src'
import { Country } from '../typings/user'
import { BasicResponseInterface } from '../typings/global'
import { URLS } from '../src/helper/urls'

describe('getCountries Method', () => {
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

  test('should return a list of countries successfully', async () => {
    mock.onGet(URLS.getCountries).reply(200, { payload: mockCountries })

    const countries = await sdk.getCountries()
    expect(countries).toEqual(mockCountries)
  }, 10000)

  test('should handle errors correctly if the request fails', async () => {
    mock.onGet(URLS.getCountries).reply(500, { message: 'Internal Server Error' })
  })
})
