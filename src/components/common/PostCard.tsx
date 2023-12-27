import UserPostBar from './UserPostBar'
import { Heart, SendHorizonal } from 'lucide-react'
import ImageViewer from './ImageViewer';
import AddComment from '../posts/AddComment';
import Link from 'next/link';


const PostCard = async ({ post,noRedirect }: { post: PostType,noRedirect?:boolean }) => {

    return (
        <div className='mb-7'>
            <UserPostBar post={post} />
            <div className="ml-12 mt-[-1rem] mb-3">
                <Link className='cursor-pointer' href={noRedirect ? "#" :`/post/${post.id}`}>
                {post.content}
                </Link>
                </div>
            {
                post?.image && (
                    <ImageViewer image={post.image} />
                )
            }


            <div className="mt-4 flex space-x-4">
                <Heart />
                <AddComment post={post} />
                <SendHorizonal width={20} height={20} className='cursor-pointer' />
            </div>
            <div className="mt-2">
                <span className='text-sm'>100 likes</span>
                <span className='ml-3  text-sm'>{post?.comment_count} replies</span>
            </div>
        </div>
    )
}

export default PostCard