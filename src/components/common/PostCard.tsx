'use client'
import UserPostBar from './UserPostBar'
import { Heart } from 'lucide-react'
import ImageViewer from './ImageViewer';
import AddComment from '../posts/AddComment';
import Link from 'next/link';
import { SharePost } from './SharePost';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const PostCard = ({
    post,
    isAuthCard,
    noRedirect
}: {
    post: PostType,
    noRedirect?: boolean,
    isAuthCard?: boolean
}) => {
    const {data} = useSession()
    const router = useRouter()
    const [status, setStatus] = useState<string>("")
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const LikeDislike = (newStatus: string) => {
        if (isButtonDisabled) {
            return;
        }

        // Disable the button
        setIsButtonDisabled(true);

        // Update the state with the new status
        setStatus(newStatus);

        // Make a POST request to the server
        axios.post('/api/like', {
            post_id: post.id,
            toUser_id: post.user_id,
            status: newStatus,
        })
            .then((res) => {
                console.log('The like response is', res.data);
            })
            .catch((err) => {
                console.error('Like error occurred', err);
            })
            .finally(() => {
                // Enable the button after the request is complete
                setIsButtonDisabled(false);

                // Refresh the page (you may want to update this logic based on your application flow)
                router.refresh();
            });
    };



    return (
        <div className='mb-7 w-full bg-custom p-4 py-4 rounded-xl'>
            <UserPostBar post={post} isAuthCard={isAuthCard} CurrentUser={data?.user?.name} />
            <div className="ml-12 mt-[-1rem] mb-3">
                <Link className='cursor-pointer' href={noRedirect ? "#" : `/post/${post.id}`}>
                    {post.content}
                </Link>
            </div>
            {
                post?.image && (
                    <ImageViewer image={post.image} />
                )
            }


            <div className="mt-4 flex space-x-4">
                {post?.Likes?.length > 0 || status == "1" ?
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 15 15"
                        fill="none"
                        onClick={() => LikeDislike("0")}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`text-red-500 cursor-pointer ${isButtonDisabled ? 'opacity-50' : ''}`}
                    >
                        <path
                            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        ></path>
                    </svg> : (<Heart
                        onClick={() => LikeDislike("1")}
                        width={20} height={20}
                        className={`cursor-pointer text-gray-500 ${isButtonDisabled ? 'opacity-50' : ''}`}
                    />
                    )}
                <AddComment post={post} />
                <SharePost url={`${process.env.NEXT_PUBLIC_APP_URL}/post/${post.id}`}  />
            </div>
            <div className="mt-2">
                <span className='text-sm text-gray-500'>{post.likes_count} likes</span>
                <span className='ml-3  text-gray-500 text-sm'>{post?.comment_count} replies</span>
            </div>
        </div>
    )
}

export default PostCard