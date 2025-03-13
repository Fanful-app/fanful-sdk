export type StorageType = {
  clear: () => Promise<void>
  removeItem: (key: string) => Promise<void>
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}

const cache = new Map<string, string>()

const inMemoryStorage: StorageType = {
  async getItem(key: string) {
    return cache.has(key) ? Promise.resolve(cache.get(key) || null) : Promise.resolve(null)
  },

  async setItem(key: string, value: string) {
    cache.set(key, value)
    return Promise.resolve()
  },

  async removeItem(key: string) {
    cache.delete(key)
    return Promise.resolve()
  },

  async clear() {
    return Promise.resolve(cache.clear())
  }
}

export default inMemoryStorage
