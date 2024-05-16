export interface PostType {
    title: string
    content: string
    createdAt: Date
    authorId: {
        name: string
        email: string
    }
}

export interface CreatePostType{
    title: string
    content: string
}

export interface UserType {
    email: string
    passwordHash: string
    name: string
  }