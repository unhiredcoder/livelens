import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoveLeft } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserComments, getUserPosts } from '@/lib/ServerMethods'
import PostCard from '@/components/common/PostCard'
import DynamicNavbar from '@/components/common/DynamicNavbar'
import CommentCard from '@/components/common/CommentCard'



const profile = async () => {

  const session: CustomSession | null = await getServerSession(authOptions)

  const posts: Array<PostType> | [] = await getUserPosts();
  const comments: Array<CommentType> | [] = await getUserComments();

  return (
    <>
      <DynamicNavbar title='profile' />
      <div className="flex mt-5  items-center space-x-4">
        <Avatar className='h-20 w-20'>
          <AvatarImage src='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg' />
          <AvatarFallback className='text-2xl font-bold'> {session?.user?.name}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl">{session?.user?.name}</h1>
          <p className='text-md text-orange-300'>@{session?.user?.username}</p>
          <h1 className='text-xl'>{session?.user?.email}</h1>
        </div>
      </div>
      <div className='mt-5'>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className='w-full'>
            <TabsTrigger className='w-full' value="post">post</TabsTrigger>
            <TabsTrigger className='w-full' value="comment">comment</TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            {
              posts && posts?.length < 1 && <h1 className='text-center font-bold text-xl mt-5'>No Post Found</h1>
            }

            {
              posts && posts.length > 0 && posts.map((item) => <PostCard post={item} key={item.id} />)
            }

          </TabsContent>
          <TabsContent value="comment">
            {
              comments && comments?.length < 1 && <h1 className='text-center font-bold text-xl mt-5'>No comments Found</h1>
          }

            {
              comments && comments.length > 0 && comments.map((item) => <CommentCard comment={item} key={item.id} />)
            }
  
          </TabsContent>
        </Tabs>

      </div>
    </>
  )
}

export default profile