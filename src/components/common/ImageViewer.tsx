'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useMediaQuery } from "@react-hook/media-query";
import { extractUniqueKey } from "@/lib/utils"
import Image from "next/image"

const ImageViewer = ({ image }: { image: string }) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    style={{
                        width: '100%',
                        cursor: 'pointer',
                        marginTop: '2px',
                        borderRadius: '8px',
                        objectFit: 'contain',
                        ...(isMobile
                            ? {

                                maxWidth: '90vw',
                                height: '400px',
                            }
                            : {
                                width: '100vw'
                            }),
                    }}
                    src={`${process.env.NEXT_PUBLIC_EDGE_STORE_URL}/${extractUniqueKey(image)}`}
                    width={100}
                    height={100}
                    alt='post'
                    unoptimized
                />
            </SheetTrigger>


            <SheetContent side={isMobile ? "bottom" : "right"} className="flex items-center justify-center">
                <SheetHeader>
                    <SheetDescription className="mb-4 flex items-center w-full justify-center">
                        <Image
                            className='w-full p-4 cursor-pointer mt-2 rounded-md object-cover'
                            sizes="(max-width:768px) 100vw,700px"
                            src={`${process.env.NEXT_PUBLIC_EDGE_STORE_URL}/${extractUniqueKey(image)}`}
                            width={100}
                            height={100}
                            unoptimized
                            alt='post'
                        />
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ImageViewer