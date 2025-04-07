import { AxiosInstance } from 'axios'
import { SupabaseClient } from '@supabase/supabase-js'

import { URLS } from './helper/urls'
import {
  PaginateParams,
  PaginateResult,
  RewardMetadata,
  CommentInterface,
  ReportCommentInterface,
  CreateCommentInterface,
  BasicResponseInterface,
  ReactOnCommentInterface
} from '../types'

export default class Comment {
  private static web: {
    network: AxiosInstance
    supabase: SupabaseClient<any, 'public', any>
  }

  constructor(web: typeof Comment.web) {
    Comment.web = web
  }

  /**
   * @method get
   * @param {Pick<CommentInterface, 'post_id'> & PaginateParams} params
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns the list of comment
   */
  public get = async (
    params: Pick<CommentInterface, 'post_id'> & PaginateParams
  ): Promise<PaginateResult<CommentInterface>> => {
    const { data } = await Comment.web.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getComment, { params })

    return data.payload
  }

  /**
   * @method create
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface, RewardMetadata>} Create comment for a post
   */
  public create = async ({ post_id, ...payload }: CreateCommentInterface) => {
    const { data } = await Comment.web.network.post<
      BasicResponseInterface<CommentInterface, RewardMetadata>
    >(URLS.createComment(post_id), payload)

    return { metadata: data.metadata, payload: data.payload }
  }

  /**
   * @method report
   * @param {ReportCommentInterface} payload
   * @returns {Promise<any>} Report a comment
   */
  public report = async (payload: Omit<ReportCommentInterface, 'post_id'>): Promise<any> => {
    const { data } = await Comment.web.network.put<BasicResponseInterface>(
      URLS.reportComment,
      payload
    )

    return data.payload
  }

  /**
   * @method delete
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public delete = async (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) => {
    const { data } = await Comment.web.network.delete<BasicResponseInterface>(
      URLS.deleteComment(params)
    )

    return data.payload
  }

  /**
   * @method like
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<RewardMetadata>} Like and Unlike a comment
   */
  public like = async (params: ReactOnCommentInterface): Promise<RewardMetadata> => {
    const { data } = await Comment.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikeComment(params)
    )

    return data.payload
  }

  /**
   * @method unlike
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<RewardMetadata>} Like and Unlike a comment
   */
  public unlike = async (params: ReactOnCommentInterface): Promise<RewardMetadata> => {
    const { data } = await Comment.web.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikeComment(params)
    )

    return data.payload
  }
}
