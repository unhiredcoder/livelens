'use client'
import { Link, MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'


const DynamicNavbar = ({title}:{title:string}) => {

    const router =useRouter()
    return (
        <div className='flex space-x-6 items-center'>
                <MoveLeft size={30} width={30}onClick={()=>router.back()}  className='cursor-pointer hover:bg-slate-300 hover:text-black rounded-xl p-1' />
            <h1 className='text-xl font-bold'>{title}</h1>
        </div>)
}

export default DynamicNavbar