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
  user: UserType;
  comment_count: number;
};

type CommentType = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: UserType;
};
