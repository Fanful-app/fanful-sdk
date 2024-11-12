import { URLS } from '../src/helper/urls'
import { PaginateParams } from '../typings/global'
import {
  CreateCommentInterface,
  ReactOnCommentInterface,
  ReactOnPostInterface
} from '../typings/post'
import {
  BlockProfileInterface,
  FollowAndUnFollowProfileInterface,
  ProfileFollowersOrFollowingQueryParamInterface
} from '../typings/user'

describe('URLS object', () => {
  test('should return the correct post URL for getPosts', () => {
    expect(URLS.getPosts).toBe('/posts')
  })

  it('should return the correct URL for getRaffles based on filter_type', () => {
    expect(URLS.getRaffles('my_entries')).toBe('/raffles/raffle-entries')
    expect(URLS.getRaffles('other')).toBe('/raffles')
  })

  test('should return the correct post URL for getPost with given postId', () => {
    const postId = '12345'
    expect(URLS.getPost(postId)).toBe(`/posts/${postId}`)
  })

  test('should return the correct URL for getProfileFollowersOrFollowing', () => {
    const params: PaginateParams & ProfileFollowersOrFollowingQueryParamInterface = {
      user_id: '12345',
      username: 'MiltonBlack',
      is_following_page: true
    }
    expect(URLS.getProfileFollowersOrFollowing(params)).toBe('/account/12345/following')
    params.is_following_page = false
    expect(URLS.getProfileFollowersOrFollowing(params)).toBe('/account/12345/followers')
  })

  test('should return the correct URL for searchShops', () => {
    const searchTerm = 'coffee'
    expect(URLS.searchShops(searchTerm)).toBe(`/stores/search?term=${searchTerm}`)
  })

  test('should return the correct URL for likeAndUnlikeComment', () => {
    const params: ReactOnCommentInterface = {
      id: '67890',
      has_liked: true,
      number_of_likes: 30,
      filter_type: 'Recent',
      post_id: '098765',
      thread_id: '3456789'
    }
    expect(URLS.likeAndUnlikeComment(params)).toBe('/comments/67890/like')
    params.has_liked = false
    expect(URLS.likeAndUnlikeComment(params)).toBe('/comments/67890/unlike')
  })

  test('should return the correct URL for createComment', () => {
    const post_id = '54321'
    expect(URLS.createComment(post_id)).toBe(`/posts/${post_id}/comment`)
  })

  test('should return the correct URL for followAndUnFollow', () => {
    const params: FollowAndUnFollowProfileInterface = {
      id: '54321',
      is_following: true
    }
    expect(URLS.followAndUnFollow(params)).toBe(`/account/${params.id}/unfollow`)
    params.is_following = false
    expect(URLS.followAndUnFollow(params)).toBe(`/account/${params.id}/follow`)
  })

  test('should return the correct URL for blockProfile', () => {
    const params: BlockProfileInterface = {
      id: '54321',
      is_blocked: true
    }
    expect(URLS.blockProfile(params)).toBe(`/account/${params.id}/unblock`)
    params.is_blocked = false
    expect(URLS.blockProfile(params)).toBe(`/account/${params.id}/block`)
  })

  test('should return the correct URL for joinRaffle', () => {
    const raffleId = '12345'
    expect(URLS.joinRaffle(raffleId)).toBe(`/raffles/${raffleId}/join`)
  })

  test('should return the correct URL for wonRaffle', () => {
    const raffleId = '12345'
    expect(URLS.wonRaffle(raffleId)).toBe(`/raffles/${raffleId}/won-details`)
  })

  test('should return the correct URL for likeAndUnlikeThread', () => {
    const params: ReactOnCommentInterface = {
      id: '67890',
      has_liked: true,
      number_of_likes: 30,
      filter_type: 'Recent',
      post_id: '098765',
      thread_id: '3456789'
    }
    expect(URLS.likeAndUnlikeThread(params)).toBe('/threads/67890/like')
    params.has_liked = false
    expect(URLS.likeAndUnlikeThread(params)).toBe('/threads/67890/unlike')
  })

  test('should return the correct URL for createThread', () => {
    const params: CreateCommentInterface = {
      id: '561937',
      post_id: '0183nd2idb',
      thread_id: 'ub2eywdw67',
      filter_type: 'Top',
      caption: 'Nice One'
    }
    expect(URLS.createThread(params)).toBe(`/comments/${params.thread_id}/thread`)
  })

  test('should return the correct URL for deleteThread', () => {
    const params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'> = {
      id: '67890',
      post_id: '12345',
      thread_id: '1111'
    }
    expect(URLS.deleteThread(params)).toBe('/comments/67890')
  })
})
