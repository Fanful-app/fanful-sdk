import {
  BasicResponseInterface,
  PaginateParams,
  PaginateResult,
  RewardMetadata
} from '@typings/global'
import { CommentInterface, CreateCommentInterface, ReactOnCommentInterface } from '@typings/post'
import { AxiosInstance } from 'axios'
import { URLS } from './helper/urls'
import { ReportCommentInterface } from '@typings/user'

export default class Comment {
  public network: AxiosInstance

  constructor(network: AxiosInstance) {
    this.network = network
  }

  /**
   * @method getComment
   * @param {Pick<CommentInterface, 'post_id'> & PaginateParams} params
   * @returns {Promise<PaginateResult<CommentInterface>>} Returns the list of comment
   */
  public getComment = async (
    params: Pick<CommentInterface, 'post_id'> & PaginateParams
  ): Promise<PaginateResult<CommentInterface>> => {
    const { data } = await this.network.get<
      BasicResponseInterface<PaginateResult<CommentInterface>>
    >(URLS.getComment, { params })

    return data.payload
  }

  /**
   * @method createComment
   * @param {CreateCommentInterface} params
   * @returns {Promise<CommentInterface, RewardMetadata>} Create comment for a post
   */
  public createComment = async ({ post_id, ...payload }: CreateCommentInterface) => {
    const { data } = await this.network.post<
      BasicResponseInterface<CommentInterface, RewardMetadata>
    >(URLS.createComment(post_id), payload)

    return { metadata: data.metadata, payload: data.payload }
  }

  /**
   * @method reportComment
   * @param {ReportCommentInterface} payload
   * @returns {Promise<any>} Report a comment
   */
  public reportComment = async (payload: Omit<ReportCommentInterface, 'post_id'>): Promise<any> => {
    const { data } = await this.network.put<BasicResponseInterface>(URLS.reportComment, payload)

    return data.payload
  }

  /**
   * @method likeAndUnlikeComment
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<T>} Like and Unlike a comment
   */
  public deleteComment = async (params: Pick<ReactOnCommentInterface, 'id' | 'post_id'>) => {
    const { data } = await this.network.delete<BasicResponseInterface>(URLS.deleteComment(params))

    return data.payload
  }

  /**
   * @method likeAndUnlikeComment
   * @param {ReactOnCommentInterface} params
   * @returns {Promise<RewardMetadata>} Like and Unlike a comment
   */
  public likeAndUnlikeComment = async (params: ReactOnCommentInterface): Promise<RewardMetadata> => {
    const { data } = await this.network.put<BasicResponseInterface<RewardMetadata>>(
      URLS.likeAndUnlikeComment(params)
    )

    return data.payload
  }
}
