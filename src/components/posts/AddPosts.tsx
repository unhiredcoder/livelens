import React, { useState } from 'react'
import UserAvatar from '../common/UserAvatar'
import { Input } from '../ui/input'
import { FileInput, Image } from 'lucide-react'
import { Button } from '../ui/button'
import { useRef } from 'react'
import ImagePreviewCard from '../common/ImagePreviewCard'
import axios from 'axios'
import toast from 'react-hot-toast'


type PostErrorType = {
    content?: string
}

const AddPosts = () => {
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [content, setContent] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<PostErrorType>({})
    const [previewUrl, setPreviewUrl] = useState<string | undefined>()



    const handleClick = () => {
        imageRef.current?.click()
    }

    const handleImageChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        console.log("🚀 ~ file: AddPosts.tsx:32 ~ handleImageChnage ~ selectedFile:", selectedFile)

        if (selectedFile) {
            setImage(selectedFile)
            const imageUrl = URL.createObjectURL(selectedFile)
            setPreviewUrl(imageUrl)
        }
    }

    const removePreviewImage = () => {
        setImage(null)
        setPreviewUrl(undefined)
    }


    const Submit = () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("content", content)
        if (image) {
            formData.append("image", image)
        }
        axios.post('/api/posts', formData)
            .then((res) => {
                setLoading(false)
                const response = res.data;
                if (response.status == 400) {
                    setErrors(response.errors)
                } else if (response.status == 200) {
                    toast.success(response.message)
                    setErrors({})
                    setImage(null)
                    setContent("")
                    setPreviewUrl(undefined)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log("There is some err occured ", err);
            })
    }

    return (
        <div className='mt-5'>
            {previewUrl ? <ImagePreviewCard image={previewUrl} removeCall={removePreviewImage} /> : <>
            </>
            } <br />
            <div className="flex justify-start items-start space-x-4 ">
                <UserAvatar name='Rahul' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBv503LZEg1VPkiF8QmU3zO7nI_GrcdqnOrw&usqp=CAU' />
                <textarea className='w-full h-24  resize-none rounded-lg text-md p-2 bg-muted outline-none placeholder:font-normal' 
                value={content}
                onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <div className='ml-14 w-full text-xs text-red-400 font-light'>{errors.content}</div>
            <div className="mt-2 ml-14 flex justify-between items-center">
                <Input ref={imageRef} onChange={handleImageChnage} type='file' className='hidden' />
                <Image height={20} width={20} onClick={handleClick} className='cursor-pointer' />
                <Button onClick={Submit} disabled={content?.length < 3 || loading ? true : false} size='sm'>Post</Button>
            </div>
        </div>
    )
}

export default AddPosts


// @ts-nocheck













// import React, { useState } from 'react'
// import UserAvatar from '../common/UserAvatar'
// import { Input } from '../ui/input'
// import { FileInput, Image } from 'lucide-react'
// import { Button } from '../ui/button'
// import { useRef } from 'react'
// import ImagePreviewCard from '../common/ImagePreviewCard'
// import axios from 'axios'
// import toast from 'react-hot-toast'



// type PostErrorType = {
//     content?: string
// }

// const AddPosts = () => {
//     const imageRef = useRef<HTMLInputElement | null>(null);
//     const [content, setContent] = useState<string>('');
//     const [image, setImage] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [errors, setErrors] = useState<PostErrorType>({});
//     const [previewUrl, setPreviewUrl] = useState<string | undefined>();

//     const handleClick = () => {
//         imageRef.current?.click();
//     };




//     const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedFile = e.target.files?.[0];
//         const imageUrl = URL.createObjectURL(selectedFile);
//         setPreviewUrl(imageUrl);
//         setImage(selectedFile);
    
//         const formData = new FormData();
//         if (selectedFile) {
//             formData.append("image", selectedFile);
//         }
//         formData.append("content", content);
//         formData.append("upload_preset", "adibhai");
//         formData.append("cloud_name", "daqjjjnb8");
    
//         try {
//             if (!selectedFile) {
//                 return toast.error("Please Upload an image");
//             }
    
//             const res = await axios.post('https://api.cloudinary.com/v1_1/daqjjjnb8/images/upload', formData);
    
//             const cloudData = res.data;
//             console.log("🚀 ~ file: AddPosts.tsx:164 ~ handleImageChange ~ cloudData:", cloudData)
//             setImage(cloudData.url);
//             // console.log(cloudData.url);
//             toast.success("Image Upload Successfully");
//         } catch (error) {
//             console.error('Error uploading image:', error.message);
//         }
//     };
    







//     const removePreviewImage = () => {
//         setImage(null)
//         setPreviewUrl(undefined)
//     }


//     const Submit = () => {

//         console.log("object");
//         // setLoading(true);

//         // const uploadData = {
//         //     content: content,
//         //     image: image,
//         // };
//         // console.log("🚀 ~ file: AddPosts.tsx:192 ~ Submit ~ uploadData:", uploadData)

//         // axios.post('/api/posts', uploadData)
//         //     .then((res) => {
//         //         setLoading(false);
//         //         const response = res.data;
//         //         if (response.status === 400) {
//         //             setErrors(response.errors);
//         //         } else if (response.status === 200) {
//         //             toast.success(response.message);
//         //             setErrors({});
//         //             setImage(null);
//         //             setContent("");
//         //             setPreviewUrl(undefined);
//         //         }
//         //     })
//         //     .catch((err) => {
//         //         setLoading(false);
//         //         console.log("There is some error occurred ", err);
//         //     });
//     };

//     return (
//         <div className='mt-5'>
//             {previewUrl ? <ImagePreviewCard image={previewUrl} removeCall={removePreviewImage} /> : <>
//             </>
//             } <br />
//             <div className="flex justify-start items-start space-x-4 ">
//                 <UserAvatar name='Rahul' image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBv503LZEg1VPkiF8QmU3zO7nI_GrcdqnOrw&usqp=CAU' />
//                 <textarea className='w-full h-24  resize-none rounded-lg text-md p-2 bg-muted outline-none placeholder:font-normal'
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}></textarea>
//             </div>
//             <div className='ml-14 w-full text-xs text-red-400 font-light'>{errors.content}</div>
//             <div className="mt-2 ml-14 flex justify-between items-center">
//                 <Input ref={imageRef} onChange={handleImageChange} type='file' className='hidden' />
//                 <Image height={20} width={20} onClick={handleClick} className='cursor-pointer' />
//                 <Button onClick={Submit} disabled={content?.length < 3 || loading ? true : false} size='sm'>Post</Button>
//             </div>
//         </div>
//     )
// }

// export default AddPosts