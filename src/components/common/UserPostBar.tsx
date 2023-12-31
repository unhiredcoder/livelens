import UserAvatar from './UserAvatar'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { FormateDate } from '@/lib/utils'
import DeletePostBtn from '../posts/DeletePostBtn'
import Link from 'next/link'

const UserPostBar = ({ post, isAuthCard, CurrentUser }: { post: PostType, isAuthCard?: boolean, CurrentUser?: string | null }) => {
    const linkHref = CurrentUser === post?.user?.name ? `/profile` : `/user/${post?.user?.id}`;
    return (
        <div className="flex">
            <Link href={linkHref}>
                <UserAvatar name={post?.user?.name} />
            </Link>
            <div className='flex  justify-between w-full ml-2 items-start'>
                <strong className='capitalize'>
                    <Link href={`/user/${post?.user?.id}`}>
                        {post.user.name}
                    </Link>
                </strong>
                <div className='flex items-center'>
                    <span className='text-gray-500'>{FormateDate(post.created_at)}</span>
                    {isAuthCard ? <DeletePostBtn id={post.id} imageUrl={post?.image} />
                        :
                        <MoreHorizontal height={22} width={22} color='gray' />
                    }
                </div>
            </div>
        </div>
    )
}


export default UserPostBar