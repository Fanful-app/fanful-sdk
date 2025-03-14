import merge from 'lodash/merge'
import { UserSessionInterface } from '../../types/index'
import inMemoryStorage, { StorageType } from './storage'

let storage: null | StorageType = null

class SessionManager {
  private static driver: StorageType
  private static readonly ACCESS_TOKEN_KEY = 'FANFUL_ACCESS_TOKEN'

  public static init(driver: StorageType = inMemoryStorage) {
    storage = driver
    driver = SessionManager.driver
  }

  public static async getItem(): Promise<UserSessionInterface | null> {
    const driver = storage || SessionManager.driver
    const payload = await driver.getItem(SessionManager.ACCESS_TOKEN_KEY)
    return payload ? JSON.parse(payload) : null
  }

  public static async setItem(value: UserSessionInterface): Promise<void> {
    const driver = storage || SessionManager.driver
    return driver.setItem(SessionManager.ACCESS_TOKEN_KEY, JSON.stringify(value))
  }

  public static async updateItem(value: Partial<UserSessionInterface>): Promise<void> {
    const response = await SessionManager.getItem()
    const session = merge({}, response, value)
    return SessionManager.setItem(session)
  }
}

export default SessionManager
