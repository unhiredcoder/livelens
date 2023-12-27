'use client'
import React from 'react'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { Button } from '../ui/button'

const UserListCard = ({user}:{user:UserType}) => {
    return (
        <div className="w-full shadow-sm p-4 rounded-md mb-3">
            <div className="flex">
                <UserAvatar name={user.name} image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBv503LZEg1VPkiF8QmU3zO7nI_GrcdqnOrw&usqp=CAU' />
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col">
                        <strong className='font-bold ml-2'>{user.name}</strong>
                        <span className='font-light ml-2 text-sm'>@{user.username}</span>
                    </div>
                    <Link href='#'><Button size='sm'>View</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default UserListCard