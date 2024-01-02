import CommentCard from '@/components/common/CommentCard'
import DynamicNavbar from '@/components/common/DynamicNavbar'
import PostCard from '@/components/common/PostCard'
import { getPost } from '@/lib/ServerMethods'
import React from 'react'

async function ShowPost({ params }: { params: { id: number } }) {
    const post = await getPost(params.id)
    return (
        <div className='m-3'>
            <DynamicNavbar title='Post Details' />
            {
                post && (<div className='mt-7'>
                    <PostCard post={post} noRedirect={true} />
                </div>)
            }
            <div className="mt-5">
                <h1 className="font-bold text-lg mb-5">Comments</h1>
                {
                    post?.Comment && post.Comment?.length > 0 ?
                        (
                            <>
                                {
                                    post.Comment.map((item: CommentType) => (
                                        <CommentCard comment={item} key={item.id} />
                                    ))
                                }
                            </>
                        ) :
                        (
                            <h1 className='font-bold text-center text-gray-400 pt-6'>
                                No Comments found :(
                            </h1>
                        )
                }
            </div>
        </div>
    )
}

export default ShowPost
