import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Shop from '../src/shop'
import { BasicResponseInterface } from '../typings/global'
import { ShopInterface, ShopResponse } from '../typings/shop'
import { URLS } from '../src/helper/urls'

describe('Shop Class', () => {
  let shop: Shop

  beforeAll(() => {
    shop = new Shop(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should fetch a list of shops with the get method', async () => {
    const mockResponse: BasicResponseInterface<ShopInterface> = {
      status: 200,
      message: 'Shops fetched successfully',
      payload: {
        featured: [
          {
            id: 1,
            url: 'https://shop1.com',
            name: 'Shop One',
            imageUrl: 'https://shop1.com/image.jpg',
            storeTerms: 'Store terms for Shop One',
            description: 'A description of Shop One',
            trackingUrl: 'https://tracking.shop1.com',
            categories: ['Category1', 'Category2'],
            generalTerms: 'General terms for Shop One',
            seoFriendlyId: 'shop-one',
            specificTerms: 'Specific terms for Shop One',
            commission: { value: '10', format: 'USD' }
          }
        ],
        fan_favorites: [
          {
            id: 2,
            url: 'https://shop2.com',
            name: 'Shop Two',
            imageUrl: 'https://shop2.com/image.jpg',
            storeTerms: 'Store terms for Shop Two',
            description: 'A description of Shop Two',
            trackingUrl: 'https://tracking.shop2.com',
            categories: ['Category3', 'Category4'],
            generalTerms: 'General terms for Shop Two',
            seoFriendlyId: 'shop-two',
            specificTerms: 'Specific terms for Shop Two',
            commission: { value: '10', format: 'USD' }
          }
        ]
      },
      metadata: null
    }

    mock.onGet(URLS.getShops).reply(200, mockResponse)

    const result = await shop.get()
    expect(result).toEqual(mockResponse.payload)
  })

  test('should search shops with the search method', async () => {
    const mockSearchResponse: ShopResponse = {
      content: [
        {
          id: 1,
          url: 'https://shop1.com',
          name: 'Shop One',
          imageUrl: 'https://shop1.com/image.jpg',
          storeTerms: 'Store terms for Shop One',
          description: 'A description of Shop One',
          trackingUrl: 'https://tracking.shop1.com',
          categories: ['Category1', 'Category2'],
          generalTerms: 'General terms for Shop One',
          seoFriendlyId: 'shop-one',
          specificTerms: 'Specific terms for Shop One',
          commission: { value: '10', format: 'USD' }
        }
      ],
      totalPages: 1,
      totalElements: 1,
      size: 10,
      number: 0,
      sort: { empty: false, sorted: true, unsorted: false },
      last: false,
      first: false,
      empty: false,
      pageable: {
        sort: { empty: false, sorted: true, unsorted: false },
        paged: true,
        offset: 2,
        unpaged: false,
        pageSize: 2,
        pageNumber: 1
      },
      numberOfElements: 0
    }

    const searchQuery = 'Shop One'

    mock.onGet(URLS.searchShops(searchQuery)).reply(200, mockSearchResponse)

    const result = await shop.search({ search: searchQuery })
    expect(result).toEqual(mockSearchResponse)
  })

  test('should handle empty search results', async () => {
    const mockSearchResponse: ShopResponse = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size: 10,
      number: 0,
      sort: { empty: false, sorted: true, unsorted: false },
      last: false,
      first: false,
      empty: false,
      pageable: {
        sort: { empty: false, sorted: true, unsorted: false },
        paged: true,
        offset: 2,
        unpaged: false,
        pageSize: 2,
        pageNumber: 1
      },
      numberOfElements: 0
    }

    const searchQuery = 'Nonexistent Shop'

    mock.onGet(URLS.searchShops(searchQuery)).reply(200, mockSearchResponse)

    const result = await shop.search({ search: searchQuery })
    expect(result).toEqual(mockSearchResponse)
  })
})
