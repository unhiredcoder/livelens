

"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';


function Register() {
    const router = useRouter()
    const [authState, setAuthState] = useState<AuthStateType>({
        name: '',
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
    })


    const [errors, setErrors] = useState<AuthErrorType>({})
    const [loading, setLoading] = useState<boolean>(false)


    const sumbit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        console.log('alldata',authState);
        axios.post('/api/auth/register',authState)
            .then((res) => {
                setLoading(false)
                const response = res.data
                if (response.status == 200) {
                    router.push(`/login?message=${response.message}`)
                } else if (response.status == 400) {
                    toast.error('Register Failed');
                    setErrors(response.errors)
                }

            }).catch((error) => {
                setLoading(false)
                toast.error('Something went wrong ❌');
                console.log("Error", error);
            })
    }

    return (
        <div className="bg-background">
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-full md:w-1/3 mx-2 bg-muted p-5 rounded-lg">
                    <div className="flex justify-center">
                        <Image src='/images/logo.png' height={50} width={50} alt='logo image' />
                    </div>
                    <h1 className='text-2xl font-bold'>Register</h1>
                    <p>Welcome to LiveLens</p>
                    <form onSubmit={sumbit}>
                        <div className="mt-5">
                            <Label htmlFor='name'>name</Label>
                            <Input type='name' placeholder='Enter your name' id='name' autoComplete='true' onChange={(e) => setAuthState({ ...authState, name: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.name}</span>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor='username'>Username</Label>
                            <Input type='username' placeholder='Enter your username' id='username' autoComplete='true' onChange={(e) => setAuthState({ ...authState, username: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.username}</span>

                        </div>
                        <div className="mt-5">
                            <Label htmlFor='email'>Email</Label>
                            <Input type='email' placeholder='Enter your email' autoComplete='true' id='email' onChange={(e) => setAuthState({ ...authState, email: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.email}</span>

                        </div>
                        <div className="mt-5">
                            <Label htmlFor='password'>Password</Label>
                            <Input type='password' autoComplete='true' placeholder='Enter your password' id='password' onChange={(e) => setAuthState({ ...authState, password: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.password}</span>

                        </div>
                        <div className="mt-5">
                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                            <Input type='password' placeholder='Confirm password' autoComplete='true' id='confirmPassword' onChange={(e) => setAuthState({ ...authState, password_confirmation: e.target.value })} />
                        </div>
                        <div className="mt-5">
                            <Button onClick={sumbit} disabled={loading} className='w-full'>{loading ? "Processing..." : "Register"}</Button>
                        </div>
                        <div className="mt-5">
                            <span>Already have an account?</span> &nbsp;
                            <Link href='/login'>Login</Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Register


