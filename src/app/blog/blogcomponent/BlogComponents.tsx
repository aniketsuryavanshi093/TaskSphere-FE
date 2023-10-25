'use client'
import LoginPopup from '@/app/_components/Models/LoginPopup'
import AuthProviders from '@/providers/AuthProviders'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "reactstrap"

const BlogButton = () => {
    return (
        <AuthProviders>
            <Component />
        </AuthProviders>
    )
}

const Component = () => {
    const [OpenModal, setOpenModal] = useState(false)
    const { data, status } = useSession()
    const openLoginpopup = () => {
        setOpenModal(true);
    }
    return (<div className="wrapper justify-end">
        {
            status === "authenticated" ? (
                <Link prefetch={false} className='create-blog btn' href="/blog/create-blog"> Create Blog </Link>
            )
                :
                (
                    <Button onClick={openLoginpopup} className="create-blog btn" >Create Blog</Button>
                )
        }
        {OpenModal && (
            <LoginPopup isOpen={OpenModal} onClose={() => setOpenModal(false)} />
        )}
    </div>)
}
export default BlogButton