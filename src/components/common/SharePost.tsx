'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Copy, SendHorizonal } from "lucide-react"
import toast from "react-hot-toast"
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterIcon,
    TwitterShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    EmailShareButton,
    EmailIcon
} from 'next-share'


export function SharePost({ url }: { url: string }) {
    const copyurl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("Copied");
        } catch (error) {
            console.error('Unable to copy to clipboard', error);
            toast.error("Failed to copy to clipboard");
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <SendHorizonal width={20} height={20} className='text-gray-500 cursor-pointer' />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-primary">Share your post on social media</AlertDialogTitle>
                    <AlertDialogDescription>
                <div className="flex rounded-md justify-between  border  p-5 mt-5">
                    <strong>{url}</strong>
                    <Copy onClick={copyurl} height={20} width={20} className="cursor-pointer" />
                </div>
                <div className="mt-2 flex  items-center space-x-2">
                    <FacebookShareButton
                        url={url}
                        quote={'Livelens is a social media app for your enjoyment.'}
                        hashtag={'#livelens'}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TelegramShareButton
                        url={url}
                        title={'Livelens - Social Media App'}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={url}
                        title={'Livelens - Social Media App'}
                        separator=":: "
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <TwitterShareButton
                        url={url}
                        title={'Livelens - Social Media App'}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <EmailShareButton
                        url={url}
                        subject={'Check out this post on Livelens'}
                        body={`Hey!\n\nI found this interesting post on Livelens: ${url}\n\nThought you might enjoy it!\n\nRegards,\n[Your Name]`}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>
                </div>
            </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="text-primary">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
