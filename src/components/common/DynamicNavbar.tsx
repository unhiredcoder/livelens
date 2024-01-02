'use client'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'


const DynamicNavbar = ({title}:{title:string}) => {

    const router =useRouter()
    return (
        <div className='flex mt-6 rounded-lg space-x-6 items-center bg-gradient-to-r from-[#877eff] via-teal-00 to-cyan-000'>
        <MoveLeft size={30} width={30} onClick={() => router.back()} className='cursor-pointer animate-pulse text-primary rounded-xl p-1' />
        <h1 className='text-sm text-primary capitalize lg:text-xl font-bold'>{title}</h1>
    </div>
    )
}

export default DynamicNavbar