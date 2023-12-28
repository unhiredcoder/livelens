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
import { useEdgeStore } from "@/lib/edgestore"
import axios from "axios"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function DeletePostBtn({ id, imageUrl }: { id: number, imageUrl?: string }) {
    const router = useRouter();
    const { edgestore } = useEdgeStore();

    async function deleteImageFromEdgestore() {
        if (imageUrl) {
            try {
                await edgestore.publicFiles.delete({
                    url: imageUrl,
                });
            } catch (error:any) {
                console.error('Error deleting image from Edgestore:', error.message);
            }
        }
    }

    async function DeletePost() {
        try {
            await axios.delete(`/api/posts/${id}`);
            await deleteImageFromEdgestore();

            router.refresh();
            toast.success('Post Deleted Successfully');
        } catch (error:any) {
            console.error('Error deleting post:', error.message);
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
                        post and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={DeletePost}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
