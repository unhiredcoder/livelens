import ThemeToggleBtn from '@/components/common/ThemeToggleBtn'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import LeftSideBar from '@/components/base/LeftSideBar'
import BaseComponent from '@/components/base/BaseComponent'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
  <BaseComponent/>
  )
}
