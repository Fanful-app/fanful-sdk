import MockAdapter from 'axios-mock-adapter'

declare global {
  var mock: MockAdapter
}

export interface BasicResponseInterface<T = null, M = null> {
  payload: T
  metadata: M
  status: number
  message: string
}

export interface RewardMetadata {
  message: string
  isMaxPointForTheDay: boolean
}

export interface PaginateResult<T = any> {
  docs: T[]
  meta?: any
  limit: number
  offset: number
  totalDocs: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  pagingCounter: number
  page?: number | undefined
  prevPage?: number | null | undefined
  nextPage?: number | null | undefined
  [customLabel: string]: T[] | number | boolean | null | undefined
}

export interface PaginateStoreResult<T = StoreInterface> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type FanfulSdkOptions = {
  client_id: string
  version: '1' | '2'
  secrete_key: string
  mode?: 'test' | 'production'
}

export interface PaginateParams extends Pick<PaginateResult, 'page'> {}

export const DEFAULT_PAGINATION: number = 10

export interface FanfulSdkConfig {}
