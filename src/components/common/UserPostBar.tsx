import React from 'react'

import UserAvatar from './UserAvatar'
import { MoreHorizontal } from 'lucide-react'
import { FormateDate } from '@/lib/utils'

const UserPostBar =  ({ post }: { post: PostType }) => {
    return (
        <div className="flex">
            <UserAvatar name='Kishan' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&usqp=CAU' />
            <div className='flex  justify-between w-full ml-2 items-start'>
                <strong>{post.user.name}</strong>
            <div className='flex items-center'>
                <span>{FormateDate(post.created_at)}</span>
                <MoreHorizontal height={22} width={22}/>
            </div>
            </div>
            </div>
            )
}

            export default UserPostBar