import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import BaseComponent from '@/components/base/BaseComponent'


export const metadata: Metadata = {
    title: 'Home',
    description: 'LiveLens to caputure your thoughts',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            <BaseComponent>
            {children}
            </BaseComponent>
        </ThemeProvider>
    )
}