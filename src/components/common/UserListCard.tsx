'use client'
import React from 'react'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { Button } from '../ui/button'


const UserListCard = ({user}:{user:UserType}) => {
    return (
        <div className="w-full bg-custom shadow-sm p-4 rounded-xl mb-3">
            <div className="flex">
                <UserAvatar name={user.name} />
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col justify-center">
                        <strong className='font-bold ml-2 capitalize'>{user.name}</strong>
                        <span className='font-light text-yellow-500 ml-2 text-sm'>@{user.username}</span>
                    </div>
                    <Link href={`/user/${user.id}`}><Button  className='bg-[#877EFF] text-primary  px-6 hover:bg-[#877eff] scale-90  py-0 rounded-sm'>View</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default UserListCard