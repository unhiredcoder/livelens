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
import { GithubLoginButton } from "react-social-login-buttons";
import ThemeToggleBtn from '@/components/common/ThemeToggleBtn'
import { useTheme } from 'next-themes'
import { ReloadIcon } from '@radix-ui/react-icons'



function Login() {
    const { status } = useSession()
    const params = useSearchParams()
    const { theme } = useTheme()
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
                    toast.success('Login Successfully');
                } else if (response.status == 400) {
                    setErrors(response.errors)
                }
            }).catch((error) => {
                setLoading(false)
                toast.error('Something went wrong ❌');
                console.log("Error", error);
            })
    }


    const githubSignIn = async () => {
        try {
            await signIn('github');
        } catch (error) {
            toast.error("Failed to sign in with Google");
            console.error("Google Sign In Error", error);
        }
    };

    return (
        <div className="bg-black">
            <div className="h-screen w-screen  flex justify-center items-center">
                <div className="w-full bg-[#EEEBE0]  md:w-1/3 mx-4  p-5 rounded-lg">
                    <div className="flex justify-center">
                        <Image src='/images/fulllogo.png'
                            className='w-2/4'
                            unoptimized
                            height={100} width={100} alt='logo' />
                    </div>
                    {params.get("message") ? <div className='bg-green-400 p-4 rounded-lg my-4'>
                        <strong className='text-primary'> Success! </strong> {params.get("message")}
                    </div> :
                        <>

                        </>
                    }

                    <h1 className='text-2xl text-custom font-bold'>Login</h1>
                    <p className='text-custom'>Welcome Back</p>
                    <form onSubmit={sumbit} >
                        <div className="mt-5">
                            <Label htmlFor='email' className='text-custom'>Email</Label>
                            <Input type='email' autoComplete='true' required placeholder='Enter your email' id='email' className='text-custom' onChange={(e) => setAuthState({ ...authState, email: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.email}</span>
                        </div>
                        <div className="mt-5">
                            <Label htmlFor='password' className='text-custom'>Password</Label>
                            <Input type='password' required placeholder='Enter your password' id='password' className='text-custom' onChange={(e) => setAuthState({ ...authState, password: e.target.value })} />
                            <span className='text-red-500 text-xs font-semibold'>{errors?.password}</span>
                        </div>
                        <div className="mt-5">
                            <Button onClick={sumbit} disabled={loading}
                                className='w-full'>
                                {loading ? (
                                    <>
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </div>
                        <div className="mt-5">
                            <span className='text-custom'>Dont't have an account?</span> &nbsp;
                            <Link href='/register' className='text-custom underline'>Register</Link>

                        </div>
                    </form>
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-t border-gray-700" />
                        <div className="mx-2 text-gray-500 font-bold">OR</div>
                        <hr className="flex-grow border-t border-gray-700" />
                    </div>
                    <div className="mt-5 flex item-center justify-center">
                        <button onClick={githubSignIn} className="github_login">
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <title>github</title> <rect fill="none" height="24" width="24"></rect> <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path> </g></svg>
                            {loading ? (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Login with Github"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login


