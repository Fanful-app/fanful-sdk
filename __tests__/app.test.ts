import FanfulSdk from '../src'

describe('Testing Fanful SDK', () => {
  const sdk = new FanfulSdk({ client_id: '', secrete_key: '' })

  test('sdk returned methods to include', () => {
    expect(sdk).toHaveProperty('getPost')
    expect(sdk).toHaveProperty('getPosts')
  })
})
