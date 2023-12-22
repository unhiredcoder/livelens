

"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


function Login() {
    const { status } = useSession()
    const params = useSearchParams()
    const router = useRouter()
    const [errors, setErrors] = useState<AuthErrorType>({})
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status])

    const [authState, setAuthState] = useState<AuthStateType>({
        email: '',
        password: ''
    })




    const sumbit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/api/auth/login', authState)
            .then((res) => {
                setLoading(false)
                const response = res.data
                if (response.status == 200) {
                    signIn("credentials",
                        {
                            email: authState.email,
                            password: authState.password,
                            callbackUrl: '/',
                            redirect: true
                        })
                    toast.success('Login In Successfully');
                } else if (response.status == 400) {
                    setErrors(response.errors)
                }
            }).catch((error) => {
                setLoading(false)
                toast.error('Something went wrong ❌');
                console.log("Error", error);
            })
        console.log('the auth state ', authState);
    }

    return (
        <div className="bg-background">
            <div className="h-screen w-screen flex justify-center items-center">
                <div className="w-full md:w-1/3 mx-2 bg-muted p-5 rounded-lg">
                    <div className="flex justify-center">
                        <Image src='/images/logo.png' height={50} width={100} alt='logo image' />
                    </div>
                    {params.get("message") ? <div className='bg-green-400 p-4 rounded-lg my-4'>

                        <strong>Success!</strong> {params.get("message")}
                    </div> :
                        <>

                        </>
                    }

                    <h1 className='text-2xl font-bold'>Login</h1>
                    <p>Welcome Back</p>
                    <form onSubmit={sumbit}>
                        <div className="mt-5">
                            <Label htmlFor='email'>Email</Label>
                            <Input type='email' autoComplete='true' required placeholder='Enter your email' id='email' onChange={(e) => setAuthState({ ...authState, email: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.email}</span>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor='password'>Password</Label>
                            <Input type='password' required placeholder='Enter your password' id='password' onChange={(e) => setAuthState({ ...authState, password: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.password}</span>
                        </div>
                        <div className="mt-5">
                            <Button onClick={sumbit} disabled={loading}
                                className='w-full'>{loading ? "Processing..." : "Login"}</Button>
                        </div>
                        <div className="mt-5">
                            <span>Dont't have an account?</span> &nbsp;
                            <Link href='/register'>Register</Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login


