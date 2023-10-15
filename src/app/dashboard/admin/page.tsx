'use client'
import React, { useEffect, useState } from 'react'
import "./admin.scss"
import AdminTabs from './_AdminComponents/AdminTabs'
import AdminUsers from './_AdminComponents/AdminUsers'
import AdminProjects from './_AdminComponents/AdminProjects'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const AdminPage: React.FC = () => {
    const [SelectedTab, setSelectedTab] = useState(useSearchParams().get('tab') || "project");
    const tabtype = useSearchParams().get('tab')
    const { data } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (data?.user?.role !== "organization") {
            router.back()
        }
    }, [data])
    useEffect(() => {
        if (tabtype) {
            setSelectedTab(tabtype)
        }
    }, [setSelectedTab, tabtype])

    return (
        <div>
            <AdminTabs SelectedTab={SelectedTab} />
            <div className='w-100 my-2'>
                {
                    SelectedTab === "project" && (
                        <AdminProjects />
                    )
                }
                {
                    SelectedTab === "users" && (
                        <AdminUsers />
                    )
                }
            </div>
        </div>
    )

}

export default AdminPage