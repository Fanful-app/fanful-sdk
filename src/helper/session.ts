import merge from 'lodash/merge'
import { UserSessionInterface } from '../../types'
import inMemoryStorage, { StorageType } from './storage'

let storage: null | StorageType = null

class SessionManager {
  private static driver: StorageType
  private static readonly ACCESS_TOKEN_KEY = 'FANFUL_ACCESS_TOKEN'

  public static init(driver: StorageType = inMemoryStorage) {
    storage = driver
    driver = SessionManager.driver
  }

  public static async getSession(): Promise<UserSessionInterface | null> {
    const driver = storage || SessionManager.driver
    const payload = await driver.getItem(SessionManager.ACCESS_TOKEN_KEY)
    return payload ? JSON.parse(payload) : null
  }

  public static async getItem(
    key: string = SessionManager.ACCESS_TOKEN_KEY
  ): Promise<string | null> {
    const driver = storage || SessionManager.driver
    return driver.getItem(key)
  }

  public static async setItem(
    key: string = SessionManager.ACCESS_TOKEN_KEY,
    value: string
  ): Promise<void> {
    const driver = storage || SessionManager.driver
    return driver.setItem(key, value)
  }

  public static async setSession(value: UserSessionInterface): Promise<void> {
    const driver = storage || SessionManager.driver
    return driver.setItem(SessionManager.ACCESS_TOKEN_KEY, JSON.stringify(value))
  }

  public static async updateItem(value: Partial<UserSessionInterface>): Promise<void> {
    const response = await SessionManager.getSession()
    const session = merge({}, response, value)
    return SessionManager.setSession(session)
  }

  public static async removeItem(key: string): Promise<void> {
    const driver = storage || SessionManager.driver
    return driver.removeItem(key)
  }
}

export default SessionManager
