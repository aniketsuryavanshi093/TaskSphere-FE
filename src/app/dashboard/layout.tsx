'use client'
import React, { useState } from 'react'
import { Providers } from '@/providers/providers'
import { SnackbarProvider } from 'notistack'
import Sidebar from '../_components/layouts/SideBar'
import ResponsiveSidebar from '../_components/layouts/ResponsiveSidebar'
import AuthProviders from '@/providers/AuthProviders'
import Search from '../_components/Search/Search'
import ProfileMenu from '../_components/layouts/ProfileMenu'
import "./dashboardpage.scss"

type PageProps = {
    children: React.JSX.Element
}
const DashBoardLayout: React.FC<PageProps> = ({ children }) => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [openMobileSidebar, setOpenMobileSidebar] = useState<boolean>(false);
    const [MobileSidebar, setMobileSidebar] = useState<boolean>(false);
    const [SearchValue, setSearchValue] = useState<string>("")
    return (
        <AuthProviders>
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
                                    <Search waitTime={1000} setValue={(val) => setSearchValue(val)} placeholder='Search for anything...' />
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