'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { MessageCircle } from "lucide-react"
import UserPostBar from "../common/UserPostBar"
import UserAvatar from "../common/UserAvatar"
import { useSession } from "next-auth/react"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const AddComment = ({ post }: { post: PostType }) => {
    const router=useRouter()
    const { data } = useSession()
    const [content, setContent] = useState<string>("")
    const [errors, setErrors] = useState<PostErrorType>({})
    const [loading, setLoading] = useState<boolean>(false)



    const submit = async () => {
        setLoading(true)

        // Check if content and post_id are not empty or undefined
        if (!content || !post.id) {
            console.log(content);
            console.log(post.id);
        }
        await axios.post("/api/comment", {
            content: content,
            post_id: post.id.toString()
        }).then((response) => {
            const res = response.data
            if (res.status == 400) {
                setErrors(res.errors)
            }
            else if (res.status == 200) {
                setContent("")
                setErrors({})
                setLoading(false)
                router.refresh()
                toast.success(res?.message)
            }
        })
            .catch((err: any) => {
                setLoading(false)
                console.log("The erros is", err);
            })
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <MessageCircle width={20} height={20} className="cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add comment</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="mt-5">
                            <UserPostBar post={post} />
                            <div className="ml-12 mt-1">{post.content}</div>
                            <div className="mt-5 flex justify-start items-start">
                                <UserAvatar name={data?.user?.name ?? "A"} />
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-24 rounded-lg text-white text-md p-2 outline-none resize-none placeholder:font-normal ml-2" placeholder="Type your comment" ></textarea>
                            </div>
                        </div>
                        <span className="text-red-400 font-bold ml-12">{errors?.content}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={submit}  >                {loading ? "Processing..." : "Post Comment"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddComment