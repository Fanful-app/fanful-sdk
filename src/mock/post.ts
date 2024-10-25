import { BasicResponseInterface, PaginateResult } from '@typings/global'
import { PostInterface } from '@typings/post'

export const PostsmockData: BasicResponseInterface<PaginateResult<PostInterface>> = {
  payload: {
    items: [
      {
        id: '1',
        caption: 'Test Caption',
        timestamp: '2024-10-01T00:00:00Z',
        is_owner: true,
        has_liked: false,
        created_at: '2024-10-01T00:00:00Z',
        updated_at: '2024-10-02T00:00:00Z',
        has_commented: true,
        number_of_likes: 100,
        number_of_comments: 50,
        media_urls: [
          {
            url: 'https://test.com/image.jpg',
            width: 300,
            height: 300,
            media_key: '1234',
            duration_ms: 20,
            blur_hash_url: 'url',
            preview_image_url: 'url',
            display_resources: [{ src: 'string', config_width: 300, config_height: 300 }],
            preview_image_resources: [{ src: 'string', config_width: 300, config_height: 300 }],
            type: 'IMAGE'
          }
        ],
        media_type: 'IMAGE',
        post_type: 'COMMUNITY',
        user: {
          display_name: 'John Doe',
          username: 'johndoe',
          avatar: 'https://test.com/avatar.jpg',
          id: 'user123'
        },
        filter_type: 'Recent'
      }
    ],
    total: 1,
    page: 1,
    limit: 10,
    docs: [],
    offset: 0,
    totalDocs: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
    pagingCounter: 0
  },
  status: 200,
  message: 'request successfull',
  metadata: null
}

export const PostmockData: BasicResponseInterface<PostInterface> = {
  payload: {
    id: '1',
    caption: 'Test Caption',
    timestamp: '2024-10-01T00:00:00Z',
    is_owner: true,
    has_liked: false,
    created_at: '2024-10-01T00:00:00Z',
    updated_at: '2024-10-02T00:00:00Z',
    has_commented: true,
    number_of_likes: 100,
    number_of_comments: 50,
    media_urls: [
      {
        url: 'https://test.com/image.jpg',
        width: 300,
        height: 300,
        media_key: '1234',
        duration_ms: 20,
        blur_hash_url: 'url',
        preview_image_url: 'url',
        display_resources: [{ src: 'string', config_width: 300, config_height: 300 }],
        preview_image_resources: [{ src: 'string', config_width: 300, config_height: 300 }],
        type: 'IMAGE'
      }
    ],
    media_type: 'IMAGE',
    post_type: 'COMMUNITY',
    user: {
      display_name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://test.com/avatar.jpg',
      id: 'user123'
    },
    filter_type: 'Recent'
  },
  status: 200,
  message: 'request successfull',
  metadata: null
}
