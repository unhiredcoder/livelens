import React, { useState, useRef } from 'react';
import UserAvatar from '../common/UserAvatar';
import { Input } from '../ui/input';
import { FileInput, Image } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEdgeStore } from '@/lib/edgestore';
import ImagePreviewCard from '../common/ImagePreviewCard';
import { ImageValidator } from '@/validator/ImageValidator';

type PostErrorType = {
    content?: string;
};

const AddPosts = () => {
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [content, setContent] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<PostErrorType>({});
    const [isImageNotValid, setIsImageNotValid] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | undefined>();
    const { edgestore } = useEdgeStore();

    const handleClick = () => {
        imageRef.current?.click();
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | undefined = e.target.files?.[0];
    
        try {
            if (selectedFile) {
                const imageUrl = URL.createObjectURL(selectedFile);
                setPreviewUrl(imageUrl);
                const isImageNotValid = ImageValidator(selectedFile.name);
                if (isImageNotValid) {
                    setPreviewUrl(undefined);
                    setIsImageNotValid(true);
                    setLoading(false);
                    return;
                }
                setIsImageNotValid(false);

                const res = await edgestore.publicFiles.upload({
                    file: selectedFile,
                });
                
                if (res) {
                    setImage(res.url);
                }
            } else {
                // console.log('No image selected');
                setPreviewUrl(undefined);
                setImage(null);
            }
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
        }
    };
    

    const removePreviewImage = () => {
        setImage(null);
        setPreviewUrl(undefined);
        setIsImageNotValid(false); 

    };

    const Submit = () => {
        setLoading(true);

        const postData = {
            content: content,
            image: image, 
        };



        axios
        .post('/api/posts', postData)
        .then((res) => {
            setLoading(false);
            const response = res.data;
            if (response.status === 400) {
                setErrors(response.errors);
            } else if (response.status === 200) {
                toast.success(response.message);
                setErrors({});
                setImage(null);
                setContent('');
                setPreviewUrl(undefined);
            }
        })
            .catch((err) => {
                setLoading(false);
                console.log('There is some err occurred ', err);
            });
    };

    return (
        <div className='mt-5'>
            {previewUrl ? <ImagePreviewCard image={previewUrl} removeCall={removePreviewImage} /> : null} <br />
            <div className='flex justify-start items-start space-x-4 '>
                <UserAvatar
                    name='Rahul'
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBv503LZEg1VPkiF8QmU3zO7nI_GrcdqnOrw&usqp=CAU'
                />
                <textarea
                    className='w-full h-24  resize-none rounded-lg text-md p-2 bg-muted outline-none placeholder:font-normal'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            {isImageNotValid && (
                <div className='ml-14 w-full text-xs text-red-400 font-light'>
                    Image is not valid. Please choose a valid image.
                </div>
            )}
            <div className='ml-14 w-full text-xs text-red-400 font-light'>{errors.content}</div>
            <div className='mt-2 ml-14 flex justify-between items-center'>
                <Input ref={imageRef} onChange={handleImageChange} type='file' className='hidden' />
                <Image height={20} width={20} onClick={handleClick} className='cursor-pointer' />
                <Button onClick={Submit} disabled={content?.length < 3 || loading} size='sm'>
                    Post
                </Button>
            </div>
        </div>
    );
};

export default AddPosts;

