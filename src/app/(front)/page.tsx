import { getPosts } from '@/lib/ServerMethods'
import Image from 'next/image'
import AddPosts from '@/components/posts/AddPosts'
import PostCard from '@/components/common/PostCard'

export default async function Home() {
  const posts: Array<PostType> | [] = await getPosts()
  return (
    <>
      <AddPosts />
      <div className="mt-5">
        {
          posts?.map((item) => (
            <PostCard post={item} key={item.id} />
          ))
        }
      </div>
    </>
  )
}