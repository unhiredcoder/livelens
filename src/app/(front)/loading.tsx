"use client"
import Image from 'next/image'

export default function Loading(){
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <Image
        src="/images/loader.svg"
        height={100} width={100} 
        alt='Loader' /> <br />
    </div>
  )
}
