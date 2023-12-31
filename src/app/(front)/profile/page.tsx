import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/options'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getServerSession } from 'next-auth'
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
    <div className='p-3'>
      <div className="mt-3">
        <DynamicNavbar title={`My Profile`} />
      </div>
      <div className="flex mt-5 bg-custom w-full p-4 rounded-lg items-center space-x-4">
        <div className='border-r-2 border-gray-700 pr-3'>


          <Avatar className='h-20 w-20 '>
            {session?.user?.image ? (
              <AvatarImage src={session?.user?.image} />
            ) : (
              <>
                <AvatarImage
                  src={`https://api.multiavatar.com/${session?.user?.name}.png`}
                />                  
                 <AvatarFallback className='text-2xl font-bold'>
                  {session?.user?.name ?? "A"}
                </AvatarFallback>
              </>
            )}
          </Avatar>
        </div>
        <div>
          <h1 className="text-2xl capitalize">{session?.user?.name}</h1>
          <p className='text-md text-yellow-500'>@{session?.user?.username ? session?.user?.username : session?.user?.name}</p>
          <h1 className='text-lg text- lowercase'>{session?.user?.email}</h1>
        </div>
      </div>
      <div className='mt-5'>
        <Tabs defaultValue="post" className="w-full ">
          <TabsList className='w-full bg-gray-600 h-14'>
            <TabsTrigger className='w-full h-12 rounded-lg  font-bold  ' value="post"><span className='text-primary'>POSTS</span></TabsTrigger>
            <TabsTrigger className='w-full h-12 rounded-lg  font-bold ' value="comment"><span className='text-primary'>COMMENTS</span></TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            {
              posts && posts?.length < 1 && <h1 className='text-center font-bold text-xl mt-8 text-gray-400'>No Post Found</h1>
            }

            {
              posts && posts.length > 0 && posts.map((item) => <PostCard post={item} key={item.id} isAuthCard={true} />)
            }

          </TabsContent>
          <TabsContent value="comment">
            {
              comments && comments?.length < 1 && <h1 className='text-center font-bold text-gray-400 text-xl mt-8 '>No comments Found</h1>
            }

            {
              comments && comments.length > 0 && comments.map((item) => <CommentCard comment={item} key={item.id} isAuthCard={true} />)
            }

          </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

export default profile