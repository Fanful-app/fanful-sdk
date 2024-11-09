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

export function getAssetMeta(file: string) {
  const fileNameWithExt = file.substring(file.lastIndexOf('/') + 1)
  const fileName = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.'))

  const fileExt = fileNameWithExt.substring(fileNameWithExt.lastIndexOf('.') + 1)

  return { ext: fileExt, name: fileName }
}

export const reportError = (error: Error) => {
  if (typeof window !== 'undefined') {
    if (window.reportError) {
      window.reportError(error)
    } else { 
      console.error('Error reported:', error?.message)
    }
  } else {
    console.error('Error reported (Node):', error?.message)
  }
}
