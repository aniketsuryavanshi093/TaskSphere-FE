"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const AuthProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SessionProvider refetchOnWindowFocus={false} >{children}</SessionProvider>
    )
}

export default AuthProviders