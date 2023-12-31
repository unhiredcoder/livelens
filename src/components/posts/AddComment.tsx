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
import { MessageCircle } from "lucide-react"
import UserPostBar from "../common/UserPostBar"
import UserAvatar from "../common/UserAvatar"
import { useSession } from "next-auth/react"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const AddComment = ({ post }: { post: PostType }) => {
    const router = useRouter()
    const { data } = useSession()
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const submit = async () => {
        setLoading(true)
        await axios.post("/api/comment", {
            content: content,
            post_id: post.id.toString(),
            toUser_id: post.user_id,
        }).then((response) => {
            const res = response.data
            if (res.status == 400) {    
                toast.error(res?.message)
            }
            else if (res.status == 200) {
                setContent("")
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
                <MessageCircle width={20} height={20} className="cursor-pointer text-gray-500" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-primary">Share your thoughts by comment</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="mt-5">
                            <UserPostBar post={post} />
                            <div className="ml-12 mt-1">{post.content}</div>
                            <div className="mt-5 flex justify-start items-start">
                                <UserAvatar name={data?.user?.name ?? "A"} image='https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg' />
                                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-24 rounded-lg text-primary text-md p-2 outline-none bg-muted resize-none placeholder:font-normal ml-2" placeholder="Type your comment here..." ></textarea>
                            </div>
                        </div>
                        <span className="text-gray-500  ml-12">{content?.length < 10 ? "The content field must have at least 10 characters" : <span className="text-green-500">Now okay :)</span>}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-primary">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={submit} disabled={content?.length < 10 || loading}>
                        {loading ?
                            "Proccessing.."
                            :
                            "Post"
                        }
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddComment