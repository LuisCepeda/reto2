'use client'
import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react'


export function Providers({ children }) {
    return (

        <SessionProvider>
            <NextUIProvider locale='co-CO'>
                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}

