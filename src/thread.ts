import { BasicResponseInterface, PaginateParams, PaginateResult } from '@typings/global'
import { CommentInterface, CreateCommentInterface, ReactOnCommentInterface } from '@typings/post'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import { omit } from './helper/utils'

export default class Thread {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getThread
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns a list of threads
   */
  public getThread = async (
    params?: Pick<CommentInterface, 'post_id' | 'thread_id'> & PaginateParams
  ): Promise<PaginateResult<CommentInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getThread, { params })

    return data.payload
  }

  /**
   * @method likeAndUnlikeThread
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<T>} Like and Unlike a Thread
   */
  public likeAndUnlikeThread = async (params: ReactOnCommentInterface) => {
    const { data } = await this.network.put<BasicResponseInterface>(
      URLS.likeAndUnlikeThread(params)
    )

    return data.payload
  }

  /**
   * @method createThread
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface>} Create a Thread for a comment
   */
  public createThread = async (params: CreateCommentInterface): Promise<CommentInterface> => {
    const { data } = await this.network.post<BasicResponseInterface<CommentInterface>>(
      URLS.createThread(params),
      { caption: params.caption, id: params.id }
    )

    return data.payload
  }

  /**
   * @method deleteThread
   * @param {Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>} params
   * @returns {Promise<T>} Delete a Thread from a comment
   */
  public deleteThread = async (
    params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>
  ) => {
    const { data } = await this.network.delete<BasicResponseInterface>(URLS.deleteThread(params), {
      params: omit(params, 'post_id')
    })

    return data.payload
  }
}
