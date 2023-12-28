import React from 'react'
import UserAvatar from './UserAvatar'
import { FormateDate } from '@/lib/utils'
import DeleteCommentBtn from '../posts/DeleteCommentBtn'

function CommentCard({ comment, isAuthCard }: { comment: CommentType, isAuthCard?: boolean }) {
    return (
        <div className="mb-3">
            <div className="flex items-center space-x-4">
                <UserAvatar name={comment.user.name} image='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg' />
                <div className="w-full rounded-lg bg-muted p-3">
                    <div className="flex justify-between items-start w-full">
                        <p className="font-bold">{comment.user.name}</p>
                        <div className="flex">
                            <span>{FormateDate(comment.created_at)}</span>
                        </div>
                    </div>
                    <div className="text-md mt-2">{comment.content}</div>
                    {isAuthCard &&
                        <div className="flex justify-end">
                         <DeleteCommentBtn id={comment.id}/>
                        </div>

                    }
                </div>
            </div>
        </div>

    )
}

export default CommentCard