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
import { MessageCircle, Loader2 } from "lucide-react"
import UserPostBar from "../common/UserPostBar"
import UserAvatar from "../common/UserAvatar"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from 'date-fns'

// Type definitions
type CommentType = {
    id: number;
    content: string;
    created_at: string;
    user_id: number;
    post_id: number;
    user: {
        name: string;
        image: string | null;
    };
}

// Comment Item Component
const CommentItem = ({ comment }: { comment: CommentType }) => {
    return (
        <div className="flex items-start gap-2 mb-4">
            <UserAvatar 
                name={comment.user?.name ?? "A"} 
                image={comment.user?.image || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'} 
            />
            <div className="flex-1">
                <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.user?.name}</span>
                        <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="text-sm text-primary">{comment.content}</p>
                </div>
            </div>
        </div>
    );
};

// Main AddComment Component
const AddComment = ({ post }: { post: PostType }) => {
    const router = useRouter()
    const { data } = useSession()
    const [content, setContent] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [comments, setComments] = useState<CommentType[]>([]);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false);

    // Fetch comments when dialog opens
    useEffect(() => {
        if (isOpen && post?.id) {
            fetchComments();
        }
    }, [isOpen, post?.id]);

    const fetchComments = async () => {
        setCommentsLoading(true);
        try {
            const response = await axios.get(`/api/comment?post_id=${post.id.toString()}`);
            setComments(response.data.comments || []);
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("Failed to load comments");
        } finally {
            setCommentsLoading(false);
        }
    };

    const submit = async () => {
        setLoading(true)
        try {
            const response = await axios.post("/api/comment", {
                content: content,
                post_id: post.id.toString(),
                toUser_id: post.user_id,
            })
            
            const res = response.data
            if (res.status == 400) {    
                toast.error(res?.message)
            }
            else if (res.status == 200) {
                setContent("")
                toast.success(res?.message)
                // Refresh comments after successful post
                await fetchComments()
                router.refresh()
            }
        } catch (err: any) {
            console.log("The error is", err);
            toast.error("Failed to post comment")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <MessageCircle width={20} height={20} className="cursor-pointer text-gray-500" />
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-primary text-left">
                        Comments
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="space-y-4">
                            {/* Original Post */}
                            <div className="border-b pb-4">
                                <UserPostBar post={post} />
                                <div className="ml-12 mt-1 text-left text-primary">{post.content}</div>
                            </div>

                            {/* Comments List */}
                            <div className="mt-4">
                                <h3 className="text-sm font-semibold text-left mb-3 text-primary">
                                    Previous Comments ({comments.length})
                                </h3>
                                
                                {commentsLoading ? (
                                    <div className="flex justify-center items-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                                    </div>
                                ) : comments.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4 text-sm">
                                        No comments yet. Be the first to comment!
                                    </p>
                                ) : (
                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                        {comments.map((comment) => (
                                            <CommentItem key={comment.id} comment={comment} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Add New Comment */}
                            <div className="mt-6 pt-4 border-t">
                                <h4 className="text-sm font-semibold text-left mb-3 text-primary">
                                    Add a Comment
                                </h4>
                                <div className="flex justify-start items-start">
                                    <UserAvatar 
                                        name={data?.user?.name ?? "A"} 
                                        image={data?.user?.image || 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'} 
                                    />
                                    <textarea 
                                        value={content} 
                                        onChange={(e) => setContent(e.target.value)} 
                                        className="w-full h-24 rounded-lg text-primary text-md p-3 outline-none bg-muted resize-none placeholder:font-normal ml-2 text-sm" 
                                        placeholder="Type your comment here..." 
                                    />
                                </div>
                                <div className="flex justify-between items-center mt-1 ml-12">
                                    <span className={`text-xs ${content?.length < 10 ? 'text-gray-500' : 'text-green-500'}`}>
                                        {content?.length < 10 
                                            ? `${content.length}/10 - Minimum 10 characters` 
                                            : `${content.length} characters - Ready to post!`
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-2">
                    <AlertDialogCancel className="text-primary">
                        Close
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={submit} 
                        disabled={content?.length < 10 || loading}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            "Post Comment"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AddComment