export enum ShopTypeInterface {
  FEATURED = 'FEATURED',
  FAN_FAVORITES = 'FAN_FAVORITES'
}

export interface ShopResponse {
  sort: Sort
  size: number
  last: boolean
  first: boolean
  empty: boolean
  number: number
  pageable: Pageable
  totalPages: number
  totalElements: number
  numberOfElements: number
  content: ShopDetailResponse[]
}

export interface ShopDetailResponse {
  id: number
  url: string
  name: string
  imageUrl: string
  storeTerms: string
  description: string
  trackingUrl: string
  categories: string[]
  generalTerms: string
  seoFriendlyId: string
  specificTerms: string
  commission: Commission
}

export interface Commission {
  value: string
  format: string
}

export interface Pageable {
  sort: Sort
  paged: boolean
  offset: number
  unpaged: boolean
  pageSize: number
  pageNumber: number
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface ShopInterface {
  featured: ShopDetailResponse[]
  fan_favorites: ShopDetailResponse[]
}

export interface SearchShopResponse
  extends Pick<ShopDetailResponse, 'id' | 'name' | 'url' | 'description' | 'commission'> {}

export type CreateShop = {
  id?: string
  seo: string
  url: string
  name: string
  type?: string
  client_id?: string
  commission: string
  storeType?: string
  description: string
  points_per_dollar: number
  imageUrl: File | undefined
}
