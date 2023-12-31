import React from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import MobileNavBar from './MobileNavBar'



const BaseComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-0">
            <div className='flex'>
                <LeftSideBar />
                <div className="h-screen w-full overflow-auto lg:w-2/4 lg:px-8 lg:py-4 md:w-3/4 xl:px-12 md:p-6">
                    <MobileNavBar />
                    {children}
                </div>
                <RightSideBar />
            </div>
        </div>)
}

export default BaseComponent