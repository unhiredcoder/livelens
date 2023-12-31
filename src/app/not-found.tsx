import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{overflow:'hidden',minWidth: "100vw", minHeight: '100vh', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Image
        src="/images/404.gif"
        className='p-5'
        height={500} width={500}
        alt='Loader' />
      <Button><Link href='/'>Go Back</Link></Button>
    </div>
  )
}
