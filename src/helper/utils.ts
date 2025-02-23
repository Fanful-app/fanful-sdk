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

/**
 *
 * @description Reports any thrown error to our error service example Sentry.
 * @function reportError
 * @property Error
 * @property stackTrace
 * @returns void
 */

export const reportError = (error: Error | string): void => {
  // Report error to external service like sentry or firebase crashlytics
  // crashlytics().recordError(error instanceof Error ? error : new Error(error));
  const errorObject = error instanceof Error ? error : new Error(error)

  console.error('Reported Error to our external service:', errorObject)
}

export const createFormDataFromPayload = (payload: Record<string, unknown>) => {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item)
      })
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        formData.append(`${key}[${subKey}]`, subValue as never)
      })
    } else {
      formData.append(key, value as never)
    }
  })

  return formData
}
