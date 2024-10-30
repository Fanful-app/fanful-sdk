/**
 * @description Utility function to omit specified keys from an object.
 * @param {T} obj - The original object.
 * @param {Array<keyof T>} keys - Keys to omit from the object.
 * @returns {Partial<T>} New object without the omitted keys.
 */
export function omit<T extends object>(obj: T, ...keys: (keyof T)[]): Partial<T> {
  const result: Partial<T> = {}

  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }

  return result
}
