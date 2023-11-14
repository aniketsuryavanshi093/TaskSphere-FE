'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Avatar from '../Avatar'
import AuthProviders from '@/providers/AuthProviders'
import { generateInitials } from '@/lib'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const HeaderProfile = () => {
    return (
        <AuthProviders>
            <Component />
        </AuthProviders>
    )
}

const Component = () => {
    const [Menu, setMenu] = useState<boolean>(false);
    const { data, status } = useSession()
    const handleLogout = async () => {
        signOut()

    };
    console.log(data, status);

    return (
        status !== "authenticated" ?
            <div className="quote_btn-container">
                <Link href="/login" prefetch={false} className="quote_btn">
                    Sign in
                </Link>
            </div>
            :
            (
                <Dropdown
                    isOpen={Menu}
                    toggle={() => {
                        setMenu(!Menu);
                    }}
                    className="d-inline-block"
                >
                    <DropdownToggle
                        className="togglebtn header-item pe-0 waves-effect"
                        style={{ height: "auto" }}
                        id="page-header-user-dropdown"
                        tag="button"
                    >
                        <div className="wrapper">
                            <Avatar image={data.user.profilePic} initials={generateInitials(data.user.userName)} />
                            <p className='mb-0 username'>{data.user.userName}</p>
                        </div>
                    </DropdownToggle>
                    <DropdownMenu
                        className="dropdown-menu-end second_primary_background"
                        id="profile_dropdown_menu"
                    >
                        <Link prefetch={false} href="/dashboard">
                            <DropdownItem tag="span" className="text_primary profile_dropdown_menu_item">
                                <i className="uil uil-user-circle font-size-18 align-middle me-2" />
                                Dashboard
                            </DropdownItem>
                        </Link>
                        <Link prefetch={false} href="/blog/userblogs">
                            <DropdownItem tag="span" className="text_primary profile_dropdown_menu_item">
                                {/* <i className="uil uil-user-circle font-size-18 align-middle me-2" />
                                 */}
                                <i className="fa-solid fa-blog font-size-18 align-middle me-2"></i>
                                My Blogs
                            </DropdownItem>
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="dropdown-item text_primary profile_dropdown_menu_item"
                        >
                            <i className="uil uil-sign-out-alt font-size-18 align-middle me-2" />
                            Logout
                        </button>
                    </DropdownMenu>
                </Dropdown>
            )
    )
}

export default HeaderProfile