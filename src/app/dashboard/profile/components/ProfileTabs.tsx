"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProfileTabs = () => {
    const router = usePathname()
    return (
        <ul className='profiletabs wrapper'>
            <li id="profile" className={`py-2 ${router === "/dashboard/profile" && "selected"} `}>
                <Link prefetch={false} href="/dashboard/profile">
                    Profile and Visibility
                </Link>
            </li>
            <li id="activity" className={`py-2 ${router?.includes("activity") && "selected"}`}>
                <Link prefetch={false} href="/dashboard/profile/activity">
                    Activity
                </Link>
            </li>
            <li id="cards" className={`py-2 ${router?.includes("cards") && "selected"}`}>
                <Link prefetch={false} href="/dashboard/profile/cards">
                    Cards
                </Link>
            </li>
        </ul>
    )
}

export default ProfileTabs