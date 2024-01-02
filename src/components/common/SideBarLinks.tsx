"use client"
import { Bell, Home, Search, User2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SignOutBtn from './SignOutBtn'
import ThemeToggleBtn from './ThemeToggleBtn'


const SideBarLinks = () => {
    const pathName = usePathname()

    return (
        <ul className='mt-10'>
            <li>
                <Link href='/'
                    className={`flex items-center text-primary  flex-start space-x-4 p-4 mt-1 pl-2 rounded-xl hover:text-white hover:font-bold hover:bg-custom transition-all duration-500 ${pathName === "/" ? "bg-custom text-white font-bold" : ""}`}>
                    <Home height={25} width={25} /><h3 className='text-lg lg:text-xl'>Home</h3>
                </Link>
            </li>
            <li>
                <Link href='/explore'
                    className={`flex items-center text-primary  flex-start space-x-4 p-4 mt-1 pl-2 rounded-xl hover:text-white hover:font-bold hover:bg-custom transition-all duration-500 ${pathName === "/explore" ? "bg-custom text-white  font-bold" : ""}`}>
                    <Search height={25} width={25} /><h3 className='text-lg lg:text-xl'>Explore</h3>
                </Link>
            </li>
            <li>
                <Link href='/notification'
                    className={`flex text-primary  items-center flex-start space-x-4 p-4 mt-1 pl-2 rounded-xl hover:text-white hover:font-bold hover:bg-custom transition-all duration-500 ${pathName === "/notification" ? " bg-custom text-white font-bold" : ""}`}>
                    <Bell height={25} width={25} className='text-lg animate:ping' />
                    <h3 className='text-lg  lg:text-xl'>Notification</h3>
                </Link>
            </li>
            <li>
                <Link href='/profile'
                    className={`flex text-primary  items-center flex-start space-x-4 p-4 mt-1 pl-2 rounded-xl hover:text-white hover:font-bold hover:bg-custom transition-all duration-500 ${pathName === "/profile" ? "bg-custom text-white  font-bold" : ""}`}>
                    <User2 height={25} width={25} /><h3 className='text-lg lg:text-xl'>Profile</h3>
                </Link>
            </li>
            <li className="flex items-center justify-between absolute bottom-10">
                <SignOutBtn />
                <ThemeToggleBtn />
            </li>
        </ul>)
}

export default SideBarLinks