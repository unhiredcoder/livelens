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
import axios from "axios"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function DeleteCommentBtn({ id }: { id: number}) {
    const router = useRouter();


    async function DeleteComment() {
        try {
            await axios.delete(`/api/comment/${id}`);
            router.refresh();
            toast.success('Comment Deleted Successfully');
        } catch (error:any) {
            console.error('Error deleting Comment:', error.message);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash2 className='ml-3 cursor-pointer hover:text-red-800 hover:bg-white rounded p-1' height={22} width={22} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        comment and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={DeleteComment}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
