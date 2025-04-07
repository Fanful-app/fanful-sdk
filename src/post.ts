import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import {
  PostInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  ReportInterface,
  CreatePostInterface,
  PostFilterInterface,
  ReactOnPostInterface,
  BasicResponseInterface
} from '../types'

export default class Post {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof Post.web) {
    Post.web = web
  }

  /**
   * @method getAll
   * @param {PaginateParams & PostFilterInterface} params - post filter param object
   * @returns {Promise<PaginateResult<PostInterface>>} Returns the posts based off the filter params passed
   */
  public getAll = async (
    params: PaginateParams & PostFilterInterface
  ): Promise<PaginateResult<PostInterface>> => {
    const { data } = await Post.web.network.get<
      BasicResponseInterface<PaginateResult<PostInterface>>
    >(URLS.getPosts, { params })

    return data.payload
  }

  /**
   * @method get
   * @param {string} post_id - post id to search for
   * @returns {Promise<PostInterface>} Returns the post that matches the id passed
   */
  public get = async (post_id: string): Promise<PostInterface> => {
    const { data } = await Post.web.network.get<BasicResponseInterface<PostInterface>>(
      URLS.getPost(post_id)
    )

    return data.payload
  }

  /**
   * @method create
   * @param {CreatePostInterface} payload
   * @returns {Promise<{ metadata: RewardMetadata; payload: PostInterface }>} Create a Post
   */
  public create = async (
    payload: CreatePostInterface
  ): Promise<{ metadata: RewardMetadata; payload: PostInterface }> => {
    const form = new FormData()
    form.append('caption', payload.caption)
    form.append('media_type', payload.media_type)

    payload.media_urls?.map((media) => {
      //@ts-ignore
      form.append('files', {
        uri: media.url,
        name: media.raw.fileName || media.media_key,
        type: media.type === 'IMAGE' ? 'image/jpeg' : 'video/mp4'
      })
    })

    const { data } = await Post.web.network.post<
      BasicResponseInterface<PostInterface, RewardMetadata>
    >(URLS.createPost, form)

    return { metadata: data.metadata, payload: data.payload }
  }

  /**
   * @method like
   * @param {ReactOnPostInterface} payload
   * @returns {Promise<RewardMetadata>} Like and Unlike a Post
   */
  public like = async (payload: ReactOnPostInterface): Promise<RewardMetadata> => {
    const { data } = await Post.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikePost(payload)
    )

    return data.payload
  }

  /**
   * @method unlike
   * @param {ReactOnPostInterface} payload
   * @returns {Promise<RewardMetadata>} Like and Unlike a Post
   */
  public unlike = async (payload: ReactOnPostInterface): Promise<RewardMetadata> => {
    const { data } = await Post.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikePost(payload)
    )

    return data.payload
  }

  /**
   * @method report
   * @param {ReportInterface} payload
   * @returns {Promise<null>} Report a Post
   */
  public report = async (payload: ReportInterface): Promise<null> => {
    const { data } = await Post.web.network.post<BasicResponseInterface>(URLS.reportPost, {
      post_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method delete
   * @param {Pick<ReactOnPostInterface, 'id'>} payload
   * @returns {Promise<null>} Delete a Post
   */
  public delete = async (payload: Pick<ReactOnPostInterface, 'id'>): Promise<null> => {
    const { data } = await Post.web.network.delete<BasicResponseInterface>(URLS.deletePost(payload))

    return data.payload
  }
}
