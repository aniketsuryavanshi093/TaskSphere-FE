'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Avatar from '../Avatar'
import AuthProviders from '@/providers/AuthProviders'
import { generateInitials } from '@/lib'

const HeaderProfile = () => {
    return (
        <AuthProviders>
            <Component />
        </AuthProviders>
    )
}

const Component = () => {
    const { data, status } = useSession()
    return (
        status !== "authenticated" ?
            <div className="quote_btn-container">
                <Link href="/login" prefetch={false} className="quote_btn">
                    Sign in
                </Link>
            </div>
            :
            (
                <div className="wrapper">
                    <Avatar image={data.user.profilePic} initials={generateInitials(data.user.userName)} />
                    <p className='mb-0 username'>{data.user.userName}</p>
                </div>
            )
    )
}

export default HeaderProfile