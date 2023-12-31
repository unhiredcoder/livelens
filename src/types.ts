type AuthStateType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
}


type AuthErrorType = {
  email?: string;
  name?: string;
  username?: string;
  password?: string;
}



type UserType = {
  id: number;
  name: string;
  username: string;
};


type PostErrorType = {
  content?: string;
};


type PostType = {
  id: number;
  user_id: number;
  content: string;
  image?: string;
  created_at: string;
  comment_count: number;
  likes_count: number;
  user: UserType;
  Likes:Array<PostLikeType> | []
};

type CommentType = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: UserType;
};


type ShowUserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  post: Array<PostType> | [];
  Comment: Array<CommentType> | []
}


type NotificationType = {
  id: number;
  user_id: number;
  toUser_id: number
  content: string;
  created_at: string;
  user: UserType
}

type LikeType = {
  user_id: number;
  toUser_id: number;
  status: string
}

type PostLikeType = {
id:number,
user_id: number;
toUser_id: number
}
