'use client'
import React, { useState, Suspense, ReactNode, useEffect } from 'react'
import { Providers } from '@/providers/providers'
import { SnackbarProvider } from 'notistack'
import Sidebar from '../_components/layouts/SideBar'
import ResponsiveSidebar from '../_components/layouts/ResponsiveSidebar'
import AuthProviders from '@/providers/AuthProviders'
import Search from '../_components/Search/Search'
import ProfileMenu from '../_components/layouts/ProfileMenu'
import "./dashboardpage.scss"
import { useSession } from 'next-auth/react'
import { clearCookies } from '@/lib'
import DashboardSearch from '../_components/Search/DashboardSearch'
import TicketInfo from '../_components/UI/TicketInfo/TicketInfo'
import Image from 'next/image'

type PageProps = {
    children: React.JSX.Element
}
const DashBoardLayout: React.FC<PageProps> = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [openMobileSidebar, setOpenMobileSidebar] = useState<boolean>(false);
    const [MobileSidebar, setMobileSidebar] = useState<boolean>(false);

    const AuthenticateUserSession: React.JSX.Element = () => {
        const { data } = useSession()
        useEffect(() => {
            if (data?.expires) {
                const expirationDate = new Date(data.expires);
                const currentDate = new Date();
                if (currentDate.getTime() >= expirationDate.getTime()) {
                    clearCookies()
                    window.location.reload()
                }
            }
        }, [data?.expires])
        return <></>
    }
    return (
        <AuthProviders>
            <AuthenticateUserSession />
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                iconVariant={{
                    success: '✅',
                    error: '✖️',
                    warning: '⚠️',
                    info: 'ℹ️',
                }}
            >
                <Providers>
                    <div className="wrapper align-start">
                        <Sidebar
                            MobileSidebar={MobileSidebar}
                            setMobileSidebar={() => setMobileSidebar(false)}
                            openSidebar={openSidebar}
                            setOpenSidebar={setOpenSidebar}
                        />
                        <ResponsiveSidebar
                            openMobileSidebar={openMobileSidebar}
                            setOpenMobileSidebar={setOpenMobileSidebar}
                        />
                        <div className={`maincontent ${openSidebar && 'largecontent'} scrollbar`} id="style-1">
                            <div className="  top_nav_wrapper">
                                <div className='wrapper justify-between px-4 w-100' >
                                    <div className='wrapper justify-start'>
                                        <Image
                                            className="d-lg-none me-2 cp"
                                            src="/images/icons/menu-light.png"
                                            onClick={() => setOpenMobileSidebar(!openMobileSidebar)}
                                            alt="test"
                                            width={25}
                                            height={25}
                                        />
                                        <DashboardSearch />
                                    </div>
                                    <ProfileMenu />
                                </div>
                            </div>
                            <div className='w-100 pagewrapper'>
                                {children}
                            </div>
                        </div>
                    </div>
                </Providers>
            </SnackbarProvider>
        </AuthProviders>
    )
}

export default DashBoardLayout