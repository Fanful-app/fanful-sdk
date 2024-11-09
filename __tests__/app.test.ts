import FanfulSdk from '../src'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Country } from '../typings/user'
import { BasicResponseInterface } from '../typings/global'

describe('Testing Fanful SDK', () => {
  const sdk = new FanfulSdk({ client_id: '', secrete_key: '' })

  test('sdk should include expected methods', () => {
    expect(sdk).toHaveProperty('user')
    expect(sdk).toHaveProperty('auth')
    expect(sdk).toHaveProperty('post')
    expect(sdk).toHaveProperty('raffle')
    expect(sdk).toHaveProperty('thread')
    expect(sdk).toHaveProperty('reward')
    expect(sdk).toHaveProperty('comment')
    expect(sdk).toHaveProperty('notification')
    expect(sdk).toHaveProperty('getCountries')
  })
})

describe('getCountries', () => {
  let mock: MockAdapter
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

  const sdk = new FanfulSdk({ client_id: '', secrete_key: '' })

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should return a list of countries', async () => {
    const mockResponse: BasicResponseInterface<Country[]> = {
      payload: mockCountries,
      metadata: null,
      status: 0,
      message: ''
    }
    mock.onGet('/api/v1/country').reply(200, mockResponse)

    const countries = await sdk.getCountries()

    expect(countries).toEqual(mockCountries)
    expect(countries.length).toBe(2)
    // expect(countries[0].name).toBe('Nigeria')
    // expect(countries[1].dialCode).toBe('+1')
  })
})
