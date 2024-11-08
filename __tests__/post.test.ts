import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Post from '../src/post'
import { URLS } from '../src/helper/urls'
import { BasicResponseInterface, PaginateResult, RewardMetadata } from '../typings/global'
import { PostInterface, CreatePostInterface, ReactOnPostInterface } from '../typings/post'
import { ReportInterface } from '../typings/user'

const mockPostResponse: BasicResponseInterface<PostInterface> = {
  status: 200,
  payload: {
    id: '1',
    caption: 'Test Post',
    media_type: 'IMAGE',
    media_urls: [
      {
        url: 'https://test.com/image.jpg',
        width: 1200,
        height: 800,
        media_key: 'image_123',
        duration_ms: 0,
        blur_hash_url: 'https://test.com/blurhash',
        preview_image_url: 'https://test.com/preview.jpg',
        display_resources: [
          { src: 'https://test.com/thumb1.jpg', config_width: 200, config_height: 133 },
          { src: 'https://test.com/thumb2.jpg', config_width: 400, config_height: 267 }
        ],
        preview_image_resources: [
          { src: 'https://test.com/preview1.jpg', config_width: 200, config_height: 133 },
          { src: 'https://test.com/preview2.jpg', config_width: 400, config_height: 267 }
        ],
        type: 'IMAGE'
      }
    ],
    timestamp: '',
    is_owner: false,
    has_liked: false,
    created_at: '',
    updated_at: '',
    has_commented: false,
    number_of_likes: 0,
    number_of_comments: 0,
    post_type: 'ALL',
    user: {
      display_name: 'John Doe',
      username: 'johndoe',
      avatar: 'avatar_url',
      id: 'user123'
    },
    filter_type: 'Recent'
  },
  metadata: null,
  message: ''
}

const mockPaginateResponse: BasicResponseInterface<PaginateResult<PostInterface>> = {
  status: 200,
  payload: {
    total: 10,
    items: [
      {
        id: '1',
        caption: 'Test Post 1',
        media_type: 'IMAGE',
        media_urls: [
          {
            url: 'https://test.com/image1.jpg',
            width: 1200,
            height: 800,
            media_key: 'image_1',
            duration_ms: 0,
            blur_hash_url: 'https://test.com/blurhash1',
            preview_image_url: 'https://test.com/preview1.jpg',
            display_resources: [
              { src: 'https://test.com/thumb1.jpg', config_width: 200, config_height: 133 },
              { src: 'https://test.com/thumb2.jpg', config_width: 400, config_height: 267 }
            ],
            preview_image_resources: [
              { src: 'https://test.com/preview1_thumb.jpg', config_width: 200, config_height: 133 },
              { src: 'https://test.com/preview2_thumb.jpg', config_width: 400, config_height: 267 }
            ],
            type: 'IMAGE'
          }
        ],
        timestamp: '',
        is_owner: false,
        has_liked: false,
        created_at: '',
        updated_at: '',
        has_commented: false,
        number_of_likes: 0,
        number_of_comments: 0,
        post_type: 'ALL',
        user: {
          display_name: 'John Doe',
          username: 'johndoe',
          avatar: 'avatar_url',
          id: 'user123'
        },
        filter_type: 'Recent'
      }
    ],
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
  metadata: null,
  message: ''
}

const mockRewardMetadata: BasicResponseInterface<RewardMetadata> = {
  status: 200,
  payload: {
    message: '',
    isMaxPointForTheDay: false
  },
  metadata: null,
  message: ''
}

const createPostPayload: CreatePostInterface = {
  caption: 'New Post',
  media_type: 'IMAGE',
  media_urls: [
    {
      url: 'https://test.com/new-image.jpg',
      width: 1200,
      height: 800,
      media_key: 'image_123',
      duration_ms: 0,
      blur_hash_url: 'https://test.com/blurhash-new-image.jpg',
      preview_image_url: 'https://test.com/preview-new-image.jpg',
      display_resources: [
        { src: 'https://test.com/thumb-new-image-200.jpg', config_width: 200, config_height: 133 },
        { src: 'https://test.com/thumb-new-image-400.jpg', config_width: 400, config_height: 267 }
      ],
      preview_image_resources: [
        {
          src: 'https://test.com/preview-new-image-thumb-200.jpg',
          config_width: 200,
          config_height: 133
        },
        {
          src: 'https://test.com/preview-new-image-thumb-400.jpg',
          config_width: 400,
          config_height: 267
        }
      ],
      type: 'IMAGE',
      raw: {
        fileName: 'image.jpg'
      }
    }
  ]
}

const reactOnPostPayload: ReactOnPostInterface = {
  id: '1',
  has_liked: false,
  number_of_likes: 10,
  user_id: 'user1',
  filter_type: 'Recent'
}

const reportPostPayload: ReportInterface = {
  id: '1',
  reason: 'Inappropriate content'
}

describe('Post Class', () => {
  let mock: MockAdapter
  let post: Post

  beforeEach(() => {
    mock = new MockAdapter(axios)
    post = new Post(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should get all posts with pagination and filters', async () => {
    mock.onGet(URLS.getPosts).reply(200, mockPaginateResponse)

    const result = await post.getAll({ page: 1, limit: 10, filter: 'recent' })

    expect(result.items.length).toBeGreaterThan(0)
    expect(result.items[0].id).toBe('1')
    expect(result.total).toBe(10)
  })

  it('should get a single post by id', async () => {
    mock.onGet(URLS.getPost('1')).reply(200, mockPostResponse)

    const result = await post.get('1')

    expect(result.id).toBe('1')
    expect(result.caption).toBe('Test Post')
  })

  it('should create a new post', async () => {
    mock.onPost(URLS.createPost).reply(200, {
      ...mockPostResponse,
      metadata: { points: 10, status: 'success' }
    })

    const result = await post.create(createPostPayload)

    expect(result.metadata.status).toBe('success')
    expect(result.payload.caption).toBe('New Post')
  })

  it('should like a post', async () => {
    mock.onPut(URLS.likeAndUnlikePost(reactOnPostPayload)).reply(200, mockRewardMetadata)

    const result = await post.like(reactOnPostPayload)

    expect(result.status).toBe('success')
    expect(result.points).toBe(10)
  })

  it('should unlike a post', async () => {
    mock.onPut(URLS.likeAndUnlikePost(reactOnPostPayload)).reply(200, mockRewardMetadata)

    const result = await post.unlike(reactOnPostPayload)

    expect(result.status).toBe('success')
    expect(result.points).toBe(10)
  })

  it('should report a post', async () => {
    mock.onPost(URLS.reportPost).reply(200, { status: 'success' })

    const result = await post.report(reportPostPayload)

    expect(result.status).toBe('success')
  })

  it('should delete a post', async () => {
    mock.onDelete(URLS.deletePost({ id: '1' })).reply(200, { status: 'success' })

    const result = await post.delete({ id: '1' })

    expect(result.status).toBe('success')
  })
})
