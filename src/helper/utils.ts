import { BasicResponseInterface, Country, PaginateResult } from '../../types/index'
import countries2to3 from "countries-list/minimal/countries.2to3.min.json";
import {
  countries,
  getCountryCode,
  getEmojiFlag,
  ICountry,
} from "countries-list";

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

/**
 *
 * @description creates a mock response basic response
 * @function createMockResponse
 * @returns {BasicResponseInterface<PaginateResult<T>>}
 */

export function createMockResponse<T = any>(data?: T[]): BasicResponseInterface<PaginateResult<T>> {
  return {
    status: 200,
    message: 'Threads fetched successfully',
    payload: {
      data: data || null,
      total: data ? data.length : 0,
      per_page: 10,
      current_page: 1,
      docs: [],
      limit: 0,
      offset: 0,
      totalDocs: data ? data.length : 0,
      totalPages: data ? Math.ceil(data.length / 10) : 0,
      hasPrevPage: false,
      hasNextPage: false,
      pagingCounter: 0
    },
    metadata: null
  }
}

/**
 *
 * @description gets all countries formatted properly
 * @function getCountries
 * @returns {Country[]}
 */
export const getCountries = (): Country[] => {
  return Object.values(countries).map((country: ICountry) => ({
    name: country.name,
    cca2: getCountryCode(country.name) as string,
    cca3: findCodes(getCountryCode(country.name) as string) as string,
    flag: getEmojiFlag(getCountryCode(country.name) as any) as string,
    dialCode: "+" + country.phone[0].toString(),
  }));
};

/**
 *
 * @description returns cca3 codes from cca2 codes
 * @function findCodes
 * @returns {string} 
 */
const findCodes = (cca2: string): string => {
  const code = countries2to3[cca2 as keyof typeof countries2to3];
  if (!code) {
    throw new Error(`Country code ${cca2} not found`);
  }
  return code;
};
