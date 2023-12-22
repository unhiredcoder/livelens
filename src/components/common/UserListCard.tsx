'use client'
import React from 'react'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { Button } from '../ui/button'

const UserListCard = () => {
    return (
        <div className="w-full shadow-sm p-4 rounded-md mb-3">
            <div className="flex">
                <UserAvatar name='Aditya' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBv503LZEg1VPkiF8QmU3zO7nI_GrcdqnOrw&usqp=CAU' />
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col">
                        <strong className='font-bold ml-2'>Aditya</strong>
                        <span className='font-light ml-2 text-sm'>@Adi</span>
                    </div>
                    <Link href='#'><Button size='sm'>View</Button></Link>
                </div>
            </div>
        </div>
    )
}

export default UserListCard