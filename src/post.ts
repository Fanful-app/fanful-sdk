import {
  BasicResponseInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata
} from '@typings/global'
import { CreatePostInterface, PostFilterInterface, PostInterface, ReactOnPostInterface } from '@typings/post'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import { ReportInterface } from '@typings/user'

export default class Post {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getPosts
   * @param {PaginateParams & PostFilterInterface} params - post filter param object
   * @returns {Promise<PaginateResult<PostInterface>>} Returns the posts based off the filter params passed
   */
  public getPosts = async (
    params: PaginateParams & PostFilterInterface
  ): Promise<PaginateResult<PostInterface>> => {
    const { data } = await this.network.get<BasicResponseInterface<PaginateResult<PostInterface>>>(
      URLS.getPosts,
      { params }
    )

    return data.payload
  }

  /**
   * @method getPost
   * @param {string} post_id - post id to search for
   * @returns {Promise<PostInterface>} Returns the post that matches the id passed
   */
  public getPost = async (post_id: string): Promise<PostInterface> => {
    const { data } = await this.network.get<BasicResponseInterface<PostInterface>>(
      URLS.getPost(post_id)
    )

    return data.payload
  }

  /**
   * @method createPost
   * @param {CreatePostInterface} payload
   * @returns {Promise<PostInterface, RewardMetadata>} Create a Post
   */
  public createPost = async (payload: CreatePostInterface) => {
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

    const { data } = await this.network.post<BasicResponseInterface<PostInterface, RewardMetadata>>(
      URLS.createPost,
      form
    )

    return { metadata: data.metadata, payload: data.payload }
  }
    
    /**
   * @method likeAndUnlikePost
   * @param {ReactOnPostInterface} payload
   * @returns {Promise<RewardMetadata>} Like and Unlike a Post
   */
  public likeAndUnlikePost = async (payload: ReactOnPostInterface): Promise<RewardMetadata> => {
    const { data } = await this.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikePost(payload)
    )

    return data.payload
  }

  /**
   * @method reportPost
   * @param {ReportInterface} payload
   * @returns {Promise<T>} Report a Post
   */
  public reportPost = async (payload: ReportInterface) => {
    const { data } = await this.network.post<BasicResponseInterface>(URLS.reportPost, {
      post_id: payload.id,
      reason: payload.reason
    })

    return data.payload
  }

  /**
   * @method deletePost
   * @param {Pick<ReactOnPostInterface, 'id'>} payload
   * @returns {Promise<T>} Delete a Post
   */
  public deletePost = async (payload: Pick<ReactOnPostInterface, 'id'>) => {
    const { data } = await this.network.delete<BasicResponseInterface>(
      URLS.deletePost(payload)
    )

    return data.payload
  }
}
