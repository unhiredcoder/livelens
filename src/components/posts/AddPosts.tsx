'use client'
import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import UserAvatar from '../common/UserAvatar';
import { Input } from '../ui/input';
import { Image } from 'lucide-react';
import { Button } from '../ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import ImagePreviewCard from '../common/ImagePreviewCard';
import { ImageValidator } from '@/validator/ImageValidator';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from "@radix-ui/react-icons"



const AddPosts = () => {
    const router = useRouter()
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<PostErrorType>({});
    const [isImageNotValid, setIsImageNotValid] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | undefined>();
    const [file, setFile] = useState<File | null>(null);
    const { edgestore } = useEdgeStore();

    const handleClick = () => imageRef.current?.click();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        try {
            if (selectedFile) {
                setFile(selectedFile);
                setLoading(true);
                const imageUrl = URL.createObjectURL(selectedFile);
                setPreviewUrl(imageUrl);
                const isImageNotValid = ImageValidator(selectedFile.name, selectedFile.size);
                if (isImageNotValid) {
                    setPreviewUrl(undefined);
                    setIsImageNotValid(isImageNotValid);
                    setLoading(false);
                    setFile(null);
                    return;
                }
                setIsImageNotValid('');
                setLoading(false);
            } else {
                setPreviewUrl(undefined);
            }
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
            setLoading(false);
        }
    };

    const removePreviewImage = () => {
        setPreviewUrl(undefined);
        setIsImageNotValid('');
        setFile(null);
    };

    const uploadImage = async () => {
        try {
            setLoading(true);
            if (file) {
                const res = await edgestore.publicFiles.upload({ file });
                return res.url;
            }
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
        } finally {
            setLoading(false);
        }
        return null;
    };

    const Submit = async () => {
        setLoading(true);
        const postData = {
            content,
            image: await uploadImage(),
        };

        axios.post('/api/posts', postData).then((res) => {
            const response = res.data;
            if (response.status === 200) {
                toast.success(response.message);
                setErrors({});
                setLoading(false);
                setContent('');
                setFile(null);
                setPreviewUrl(undefined);
                setIsImageNotValid('');
                router.refresh();
            } else if (response.status === 400) {
                setErrors(response.errors);
            }
        }).catch((err) => {
            setLoading(false);
            console.log('Error occurred:', err);
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
                    placeholder='Post something interesting or informative...'
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            {isImageNotValid && (
                <div className='ml-14 w-full text-xs text-red-400 font-light'>
                    {isImageNotValid}
                </div>
            )}
            <div className='ml-14 w-full text-xs text-red-400 font-light'>{errors.content}</div>
            <div className='mt-2 ml-14 flex justify-between items-center'>
                <Input ref={imageRef} onChange={handleImageChange} type='file' className='hidden' />
                <Image height={20} width={20} onClick={handleClick} className='cursor-pointer' />
                <Button onClick={Submit} disabled={content?.length < 3 || loading} size='sm'>
                    {loading ? (
                        <>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Post"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default AddPosts;

