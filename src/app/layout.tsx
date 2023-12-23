import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import toast, { Toaster } from 'react-hot-toast';
import CustomSessionProvider from './CustomSessionProvider';
import { EdgeStoreProvider } from '../lib/edgestore';



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LiveLens',
  description: 'LiveLens to caputure your thoughts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <CustomSessionProvider>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </CustomSessionProvider>
      </body>
    </html>
  )
}
