'use client'
import LoginPopup from '@/app/_components/Models/LoginPopup'
import React, { useState } from 'react'
import { Button } from "reactstrap"

const BlogButton = () => {
    const [OpenModal, setOpenModal] = useState(false)
    const openLoginpopup = () => {
        setOpenModal(true);
    }
    return (
        <>
            <Button onClick={openLoginpopup} className="create-blog btn" >Create Blog</Button>
            {OpenModal && (
                <LoginPopup isOpen={OpenModal} onClose={() => setOpenModal(false)} />
            )}
        </>

    )
}

export default BlogButton