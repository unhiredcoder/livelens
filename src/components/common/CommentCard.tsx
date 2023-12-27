import React from 'react'
import UserAvatar from './UserAvatar'
import { FormateDate } from '@/lib/utils'

function CommentCard({ comment }: { comment: CommentType }) {
    return (
        <div className="mb-3">

            <div className="flex items-center space-x-4">
                <UserAvatar name={comment.user.name}  />
                <div className="w-full rounded-lg bg-muted p-3">
                    <div className="flex justify-between items-start w-full">
                        <p className="font-bold">{comment.user.name}</p>
                        <div className="flex">
                            <span>{FormateDate(comment.created_at)}</span>
                        </div>
                    </div>
                    <div className="text-md mt-2">{comment.content}</div>
                </div>
            </div>

        </div>
    )
}

export default CommentCard