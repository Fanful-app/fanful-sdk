import { UserInterface } from './user'

type ImageAsset = {
  [x: string]: string
}

export interface PostFilterInterface extends Partial<Pick<PostInterface, 'post_type'>> {
  user_id?: string
  filter_type: 'Recent' | 'Top'
}

export interface ThumbnailResource {
  src: string
  config_width: number
  config_height: number
}

export interface PostMediaInterface {
  url: string
  width: number
  height: number
  media_key: string
  duration_ms: number
  blur_hash_url: string
  preview_image_url: string
  display_resources: ThumbnailResource[]
  preview_image_resources: ThumbnailResource[]
  type: 'ALL' | 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM' | 'CAPTION'
}

export interface PostInterface extends PostFilterInterface {
  id: string
  type?: string
  caption: string
  timestamp: string
  is_owner: boolean
  is_addon?: boolean
  has_liked: boolean
  created_at: string
  updated_at: string
  has_commented: boolean
  number_of_likes: number
  permalink?: string | null
  number_of_comments: number
  media_urls: PostMediaInterface[]
  media_type: PostMediaInterface['type']
  post_type: 'ALL' | 'INSTAGRAM' | 'TWITTER' | 'COMMUNITY' | 'ARTICLE'
  user: Pick<UserInterface, 'display_name' | 'username' | 'avatar' | 'id'>
}

export interface CommentInterface
  extends Pick<
    PostInterface,
    | 'id'
    | 'user'
    | 'caption'
    | 'is_owner'
    | 'timestamp'
    | 'has_liked'
    | 'filter_type'
    | 'number_of_likes'
  > {
  post_id: string
  thread_id: string | null
  number_of_replies: number
}

export type CreatePostInterface = Pick<PostInterface, 'caption'> & {
  media_type: PostInterface['media_type']
  media_urls?: (PostMediaInterface & { raw: ImageAsset })[]
}

export type CreateCommentInterface = Pick<
  CommentInterface,
  'id' | 'post_id' | 'caption' | 'thread_id' | 'filter_type'
> &
  PostFilterInterface

export type ReactOnPostInterface = Pick<PostInterface, 'id' | 'has_liked' | 'number_of_likes'> &
  PostFilterInterface

export type ReactOnCommentInterface = ReactOnPostInterface &
  Pick<CommentInterface, 'post_id' | 'thread_id' | 'filter_type'>
