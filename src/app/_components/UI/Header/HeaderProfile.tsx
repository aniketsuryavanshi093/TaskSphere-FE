import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const HeaderProfile = () => {
    const { data, status } = useSession()
    return (
        status === "authenticated" ?
            <div className="quote_btn-container">
                <Link href="/login" prefetch={false} className="quote_btn">
                    Sign in
                </Link>
            </div>
            :
            (
                <div className="wrapper">
                    {/* <Avatar */}
                </div>
            )
    )
}

export default HeaderProfile