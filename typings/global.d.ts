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

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type FanfulSdkOptions = {
  client_id: string
  secrete_key: string
  mode?: 'test' | 'production'
}

export interface PaginateParams extends Pick<PaginateResult, 'page'> {}
