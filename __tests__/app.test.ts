import FanfulSdk from '../src'

describe('Testing Fanful SDK', () => {
  const sdk = new FanfulSdk({ client_id: '', secrete_key: '' })

  test('sdk should include expected methods', () => {
    expect(sdk).toHaveProperty('getPost')
    expect(sdk).toHaveProperty('getPosts')
    expect(sdk).toHaveProperty('getCountries')
    expect(sdk).toHaveProperty('getReferrals')
    expect(sdk).toHaveProperty('getUserProfile')
    expect(sdk).toHaveProperty('getFanRewardPoints')
    expect(sdk).toHaveProperty('getComment')
    expect(sdk).toHaveProperty('getNotifications')
    expect(sdk).toHaveProperty('getRaffles')
    expect(sdk).toHaveProperty('getRankPoints')
    expect(sdk).toHaveProperty('getRewards')
    expect(sdk).toHaveProperty('getShops')
    expect(sdk).toHaveProperty('searchShops')
    expect(sdk).toHaveProperty('getThread')
  })
})
