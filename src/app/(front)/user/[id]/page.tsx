import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser } from '@/lib/ServerMethods'
import PostCard from '@/components/common/PostCard'
import DynamicNavbar from '@/components/common/DynamicNavbar'
import CommentCard from '@/components/common/CommentCard'



const ShowUser = async ({ params }: { params: { id: number } }) => {
    const user: ShowUserType | null = await getUser(params.id)
    return (
        <div className='p-3'>
            <div className="mt-3">
                <DynamicNavbar title={`${user?.name}'s Profile`} />
            </div>
            <div className="flex mt-5 bg-custom w-full  p-4 rounded-lg items-center space-x-4">
                <div className='border-r-2 border-gray-700 pl-3 pr-3'>
                    <Avatar className='h-20 w-20 '>
                        <AvatarImage
                            src={`https://api.multiavatar.com/${user?.name}.png`}
                        />                        <AvatarFallback className='text-2xl font-bold'> {user?.name ?? "A"}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h1 className="text-2xl capitalize">{user?.name}</h1>
                    <p className='text-md text-orange-300'>@{user?.username}</p>
                    <h1 className='text-lg text- lowercase'>{user?.email}</h1>
                </div>
            </div>
            <div className='mt-5'>
                <Tabs defaultValue="post" className="w-full shadow-xl ">
                    <TabsList className='w-full h-14'>
                        <TabsTrigger className='w-full h-12 rounded-lg  font-bold  ' value="post"><span className='text-primary'>POSTS</span></TabsTrigger>
                        <TabsTrigger className='w-full h-12 rounded-lg  font-bold ' value="comment"><span className='text-primary'>COMMENTS</span></TabsTrigger>
                    </TabsList>
                    <TabsContent value="post">
                        {
                            user?.post && user?.post?.length < 1 && <h1 className='text-center font-bold text-xl mt-8 text-gray-400'>No post Found</h1>
                        }

                        {
                            user?.post && user?.post.length > 0 && user?.post.map((item) => <PostCard post={item} key={item.id} isAuthCard={false} />)
                        }

                    </TabsContent>
                    <TabsContent value="comment">
                        {
                            user?.Comment && user?.Comment?.length < 1 && <h1 className='text-center font-bold text-gray-400 text-xl mt-8 '>No Comment Found</h1>
                        }

                        {
                            user?.Comment && user?.Comment.length > 0 && user?.Comment.map((item) => <CommentCard comment={item} key={item.id} isAuthCard={false} />)
                        }

                    </TabsContent>
                </Tabs>

            </div>
        </div>
    )
}

export default ShowUser