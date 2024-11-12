import axios from 'axios'
import Thread from '../src/thread'
import { BasicResponseInterface, PaginateResult } from '../typings/global'
import { CommentInterface, CreateCommentInterface, ReactOnCommentInterface } from '../typings/post'
import { URLS } from '../src/helper/urls'

describe('Thread Class', () => {
  let thread: Thread

  beforeAll(() => {
    thread = new Thread(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  test('should fetch threads with the get method', async () => {
    const mockResponse: BasicResponseInterface<PaginateResult<CommentInterface>> = {
      status: 200,
      message: 'Threads fetched successfully',
      payload: {
        data: [
          {
            id: 'comment123',
            user: {
              id: 'user123',
              display_name: 'John Doe',
              username: 'johndoe',
              avatar: 'http://avatar.url'
            },
            caption: 'This is a comment',
            is_owner: false,
            timestamp: '2024-11-08T12:00:00Z',
            has_liked: false,
            filter_type: 'Recent',
            number_of_likes: 10,
            post_id: 'post123',
            thread_id: 'thread123',
            number_of_replies: 5
          }
        ],
        total: 1,
        per_page: 10,
        current_page: 1,
        docs: [],
        limit: 0,
        offset: 0,
        totalDocs: 0,
        totalPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 0
      },
      metadata: null
    }

    const params = {
      post_id: 'post123',
      thread_id: 'thread123'
    }

    mock.onGet(URLS.getThread).reply(200, mockResponse)

    const result = await thread.get(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('should like a thread with the like method', async () => {
    const mockResponse: BasicResponseInterface = {
      status: 200,
      message: 'Thread liked successfully',
      payload: null,
      metadata: null
    }

    const params: ReactOnCommentInterface = {
      id: 'thread123',
      has_liked: false,
      number_of_likes: 10,
      filter_type: 'Recent',
      post_id: 'post123',
      thread_id: 'thread123'
    }

    mock.onPut(URLS.likeAndUnlikeThread(params)).reply(200, mockResponse)

    const result = await thread.like(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('should unlike a thread with the unlike method', async () => {
    const mockResponse: BasicResponseInterface = {
      status: 200,
      message: 'Thread unliked successfully',
      payload: null,
      metadata: null
    }

    const params: ReactOnCommentInterface = {
      id: 'thread123',
      has_liked: false,
      number_of_likes: 10,
      filter_type: 'Recent',
      post_id: 'post123',
      thread_id: 'thread123'
    }

    mock.onPut(URLS.likeAndUnlikeThread(params)).reply(200, mockResponse)

    const result = await thread.unlike(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('should create a thread with the create method', async () => {
    const mockResponse: BasicResponseInterface<CommentInterface> = {
      status: 200,
      message: 'Thread created successfully',
      payload: {
        id: 'thread123',
        post_id: 'post123',
        thread_id: 'thread123',
        caption: 'This is a new thread',
        filter_type: 'Recent',
        number_of_replies: 0,
        user: {
          id: 'user123',
          display_name: 'John Doe',
          username: 'johndoe',
          avatar: 'http://avatar.url'
        },
        is_owner: false,
        timestamp: '',
        has_liked: false,
        number_of_likes: 0
      },
      metadata: null
    }

    const params: CreateCommentInterface = {
      id: 'comment123',
      post_id: 'post123',
      caption: 'This is a new thread',
      thread_id: 'thread123',
      filter_type: 'Recent'
    }

    mock.onPost(URLS.createThread(params)).reply(200, mockResponse)

    const result = await thread.create(params)
    expect(result).toEqual(mockResponse.payload)
  })

  test('should delete a thread with the delete method', async () => {
    const mockResponse: BasicResponseInterface<CommentInterface> = {
      status: 200,
      message: 'Thread deleted successfully',
      payload: {
        id: 'thread123',
        post_id: 'post123',
        thread_id: 'thread123',
        caption: 'This thread has been deleted',
        filter_type: 'Recent',
        number_of_replies: 0,
        user: {
          id: 'user123',
          display_name: 'John Doe',
          username: 'johndoe',
          avatar: 'http://avatar.url'
        },
        is_owner: false,
        timestamp: '',
        has_liked: false,
        number_of_likes: 0
      },
      metadata: null
    }

    const params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'> = {
      id: 'thread123',
      post_id: 'post123',
      thread_id: 'thread123'
    }

    mock.onDelete(URLS.deleteThread(params)).reply(200, mockResponse)

    const result = await thread.delete(params)
    expect(result).toEqual(mockResponse.payload)
  })
})
