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
                    className={`flex items-center flex-start space-x-4 p-4 pl-2 rounded-xl hover:font-bold hover:bg-slate-300/10 ${pathName === "/" ? "font-bold" : ""}`}>
                    <Home height={25} width={25} /><h3 className='text-lg lg:text-xl'>Home</h3>
                </Link>
            </li>
            <li>
                <Link href='/'
                    className={`flex items-center flex-start space-x-4 p-4 pl-2 rounded-xl hover:font-bold hover:bg-slate-300/10 ${pathName === "/explore" ? "font-bold" : ""}`}>
                    <Search height={25} width={25} /><h3 className='text-lg lg:text-xl'>Explore</h3>
                </Link>
            </li>
            <li>
                <Link href='/'
                    className={`flex items-center flex-start space-x-4 p-4 pl-2 rounded-xl hover:font-bold hover:bg-slate-300/10 ${pathName === "/notification" ? "font-bold" : ""}`}>
                    <Bell height={25} width={25} /><h3 className='text-lg lg:text-xl'>Notification</h3>
                </Link>
            </li>
            <li>
                <Link href='/profile'
                    className={`flex items-center flex-start space-x-4 p-4 pl-2 rounded-xl hover:font-bold hover:bg-slate-300/10 ${pathName === "/profile" ? "font-bold" : ""}`}>
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