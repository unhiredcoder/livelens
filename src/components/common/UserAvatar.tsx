import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'

const UserAvatar = ({name,image}:{name:string,image?:string}) => {
  return (
   <Avatar>
    <AvatarImage src={image}/>
    <AvatarFallback>{name}</AvatarFallback>
   </Avatar>
  )
}

export default UserAvatar