import React from 'react'
import { Avatar, AvatarImage,AvatarFallback } from '../ui/avatar'

const UserAvatar = ({name,image}:{name:string,image?:string}) => {
  return (
   <Avatar>
    <AvatarImage src={image}/>
    <AvatarFallback>{name}</AvatarFallback>
   </Avatar>
  )
}

export default UserAvatar