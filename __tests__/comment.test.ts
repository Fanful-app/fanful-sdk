import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Comment from '../src/comment'
import { URLS } from '../src/helper/urls'
import {
  BasicResponseInterface,
  PaginateResult,
  RewardMetadata,
  PaginateParams
} from '../typings/global'
import { CommentInterface, CreateCommentInterface, ReactOnCommentInterface } from '../typings/post'
import { ReportCommentInterface } from '../typings/user'

describe('Comment class', () => {
  let comment: Comment

  beforeEach(() => {
    comment = new Comment(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it('should fetch a list of comments with the get method', async () => {
    const mockResponse: BasicResponseInterface<PaginateResult<CommentInterface>> = {
      status: 200,
      message: 'Success',
      payload: {
        docs: [],
        limit: 10,
        offset: 0,
        totalDocs: 0,
        totalPages: 0,
        hasPrevPage: false,
        hasNextPage: false,
        pagingCounter: 1,
        page: 1,
        prevPage: null,
        nextPage: null
      },
      metadata: null
    }

    const params: Pick<CommentInterface, 'post_id'> & PaginateParams = {
      post_id: 'post123',
      page: 1
    }

    mock.onGet(URLS.getComment).reply(200, mockResponse)

    const result = await comment.get(params)
    expect(result).toEqual(mockResponse.payload)
  })

  it('should create a comment with the create method', async () => {
    const mockComment: CommentInterface = {
      post_id: 'post123',
      thread_id: null,
      id: 'comment123',
      user: {
        display_name: 'John Doe',
        username: 'johndoe',
        avatar: 'avatar_url',
        id: 'user123'
      },
      caption: 'This is a comment',
      is_owner: false,
      timestamp: new Date().toISOString(),
      has_liked: false,
      filter_type: 'Recent',
      number_of_likes: 10,
      number_of_replies: 0
    }

    const mockMetadata: RewardMetadata = {
      message: 'Points awarded',
      isMaxPointForTheDay: false
    }

    const mockResponse: BasicResponseInterface<CommentInterface, RewardMetadata> = {
      status: 201,
      message: 'Comment created successfully',
      payload: mockComment,
      metadata: mockMetadata
    }

    const params: CreateCommentInterface = {
      id: 'comment123',
      post_id: 'post123',
      caption: 'This is a comment',
      thread_id: null,
      filter_type: 'Recent'
    }

    mock.onPost(URLS.createComment(params.post_id)).reply(201, mockResponse)

    const result = await comment.create(params)
    expect(result).toEqual({ payload: mockResponse.payload, metadata: mockResponse.metadata })
  })

  it('should report a comment with the report method', async () => {
    const mockResponse: BasicResponseInterface = {
      status: 200,
      message: 'Comment reported successfully',
      payload: null,
      metadata: null
    }

    const payload: Omit<ReportCommentInterface, 'post_id'> = {
      comment_id: 'comment123',
      reason: 'Inappropriate content'
    }

    mock.onPut(URLS.reportComment).reply(200, mockResponse)

    const result = await comment.report(payload)
    expect(result).toBeNull()
  })

  it('should delete a comment with the delete method', async () => {
    const mockResponse: BasicResponseInterface = {
      status: 200,
      message: 'Comment deleted successfully',
      payload: null,
      metadata: null
    }

    const params: Pick<ReactOnCommentInterface, 'id' | 'post_id'> = {
      id: 'comment123',
      post_id: 'post123'
    }

    mock.onDelete(URLS.deleteComment(params)).reply(200, mockResponse)

    const result = await comment.delete(params)
    expect(result).toBeNull()
  })

  it('should like a comment with the like method', async () => {
    const mockResponse: BasicResponseInterface<RewardMetadata> = {
      status: 200,
      message: 'Comment liked successfully',
      payload: {
        message: 'Points awarded',
        isMaxPointForTheDay: false
      },
      metadata: null
    }

    const params: ReactOnCommentInterface = {
      id: 'comment123',
      post_id: 'post123',
      thread_id: 'thread456',
      filter_type: 'Recent',
      has_liked: false,
      number_of_likes: 10
    }

    mock.onPut(URLS.likeAndUnlikeComment(params)).reply(200, mockResponse)

    const result = await comment.like(params)
    expect(result).toEqual(mockResponse.payload)
  })

  it('should unlike a comment with the unlike method', async () => {
    const mockResponse: BasicResponseInterface<RewardMetadata> = {
      status: 200,
      message: 'Comment unliked successfully',
      payload: {
        message: 'Points deducted',
        isMaxPointForTheDay: false
      },
      metadata: null
    }

    const params: ReactOnCommentInterface = {
      id: 'comment123',
      post_id: 'post123',
      thread_id: 'thread456',
      filter_type: 'Recent',
      has_liked: true,
      number_of_likes: 15
    }

    mock.onPut(URLS.likeAndUnlikeComment(params)).reply(200, mockResponse)

    const result = await comment.unlike(params)
    expect(result).toEqual(mockResponse.payload)
  })
})
