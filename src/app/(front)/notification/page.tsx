import DynamicNavbar from '@/components/common/DynamicNavbar'
import UserAvatar from '@/components/common/UserAvatar'
import { getNotifications } from '@/lib/ServerMethods'
import { FormateDate } from '@/lib/utils'
import React from 'react'

const page = async () => {

    const notification: Array<NotificationType> = await getNotifications()
    return (
        <div className='p-3'>
            <DynamicNavbar title='Notifications'  />
            <div className="mt-5">
                {
                    notification && notification.length < 1 && <h1 className='text-center font-bold'>No Notification</h1>
                }
                {notification && notification.length > 0 &&

                    notification.map((item) => (

                        <div className="flex  bg-custom   px-3 rounded-xl items-center mt-5 space-x-4" key={item.id}>
                            <UserAvatar name={item.user.name} image='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg' />
                            <div className=" w-full p-4">
                                <div className="flex justify-between items-start w-full">
                                    <p className="font-bold capitalize">{item.user.name}</p>
                                    <div className="flex">
                                        <span>{FormateDate(item.created_at)}</span>
                                    </div>
                                </div>
                                <div>{item.content}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default page