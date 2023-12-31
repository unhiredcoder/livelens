import Image from 'next/image'

export default function Loading(){
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw]'>
      <Image
        src="/images/loader.svg"
        height={200} width={200} 
        alt='Loader' />
    </div>
  )
}
