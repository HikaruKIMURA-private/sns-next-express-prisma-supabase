export interface ProfileType {
  id: number
  bio: String
  profileImageUrl: string
  userId: number
  user: UserType
}

export interface UserType {
  id: number
  username: string
  email: string
  password: string
  posts: PostType[]
  profile: ProfileType
}

export interface PostType {
  id: number
  content: string
  createdAt: string
  authorId: number
  author: UserType
}
