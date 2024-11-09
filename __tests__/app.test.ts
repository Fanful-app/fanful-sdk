import FanfulSdk from '../src'

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
