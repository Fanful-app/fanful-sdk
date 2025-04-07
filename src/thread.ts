import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import {
  PaginateParams,
  PaginateResult,
  CommentInterface,
  CreateCommentInterface,
  BasicResponseInterface,
  ReactOnCommentInterface
} from '../types/index'
import { URLS } from './helper/urls'
import { omit } from './helper/utils'

export default class Thread {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof Thread.web) {
    Thread.web = web
  }

  /**
   * @method get
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns a list of threads
   */
  public get = async (
    params?: Pick<CommentInterface, 'post_id' | 'thread_id'> & PaginateParams
  ): Promise<PaginateResult<CommentInterface>> => {
    const { data } = await Thread.web.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getThread, { params })

    return data.payload
  }

  /**
   * @method like
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<null>} Like and Unlike a Thread
   */
  public like = async (params: ReactOnCommentInterface): Promise<null> => {
    const { data } = await Thread.web.network.put<BasicResponseInterface>(
      URLS.likeAndUnlikeThread(params)
    )

    return data.payload
  }

  /**
   * @method unlike
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<null>} Like and Unlike a Thread
   */
  public unlike = async (params: ReactOnCommentInterface): Promise<null> => {
    const { data } = await Thread.web.network.put<BasicResponseInterface>(
      URLS.likeAndUnlikeThread(params)
    )

    return data.payload
  }

  /**
   * @method create
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface>} Create a Thread for a comment
   */
  public create = async (params: CreateCommentInterface): Promise<CommentInterface> => {
    const { data } = await Thread.web.network.post<BasicResponseInterface<CommentInterface>>(
      URLS.createThread(params),
      { caption: params.caption, id: params.id }
    )

    return data.payload
  }

  /**
   * @method delete
   * @param {Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>} params
   * @returns {Promise<CommentInterface>} Delete a Thread from a comment
   */
  public delete = async (
    params: Pick<ReactOnCommentInterface, 'id' | 'post_id' | 'thread_id'>
  ): Promise<CommentInterface> => {
    const { data } = await Thread.web.network.delete<BasicResponseInterface<CommentInterface>>(
      URLS.deleteThread(params),
      { params: omit(params, 'post_id') }
    )

    return data.payload
  }
}
