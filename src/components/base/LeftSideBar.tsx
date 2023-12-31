"use client"
import Image from 'next/image'
import React from 'react'
import { useTheme } from 'next-themes'
import SideBarLinks from '../common/SideBarLinks'



const LeftSideBar = () => {
    const { theme } = useTheme()
    return (
        <div className='h-screen border-r-2 md:w-1/4 lg:p-8 md:pt-5 hidden md:block  border-border'>
            <div className="flex justify-start items-center">
                <Image src='/images/logo.png'
                    className={`${theme === 'dark' ? 'invert rounded-lg' : 'rounded-lg'}`}
                    height={50} width={50} alt='logo' />
                <h1 className='font-bold text-primary text-xl ml-2'>LiveLens</h1>
            </div>
         <SideBarLinks/>
        </div>
    )
}

export default LeftSideBar