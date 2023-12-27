// 'use client'
import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import MobileNavBar from './MobileNavBar'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { ScrollArea } from '@/components/ui/scroll-area'



const BaseComponent = ({ children }: { children: React.ReactNode }) => {
    // const { theme } = useTheme()
    return (
        <div className="p-5">
            <div className='flex'>
                <LeftSideBar />
                <ScrollArea className="h-screen w-full lg:w-2/4 lg:px-8 lg:py-4 md:w-3/4 xl:px-12 md:p-6">
                    <MobileNavBar />
                    <div className="justify-center items-center hidden md:flex">
                        <Image
                            src="/images/logo.png"
                            // className={`${theme === 'dark' ? 'invert rounded-lg' : 'rounded-lg'}`}
                            height={40}
                            width={40}
                            alt="logo"
                        />
                    </div>
                    {children}
                </ScrollArea>
                <RightSideBar />
            </div>
        </div>)
}

export default BaseComponent