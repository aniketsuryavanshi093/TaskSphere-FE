'use client'
import React, { useEffect, useState } from 'react'
import "./admin.scss"
import AdminTabs from './_AdminComponents/AdminTabs'
import AdminUsers from './_AdminComponents/AdminUsers'
import AdminProjects from './_AdminComponents/AdminProjects'
import { useSearchParams } from 'next/navigation'

const AdminPage: React.FC = () => {
    const [SelectedTab, setSelectedTab] = useState("project");
    // const [createProjectModal, setcreateProjectModal] = useState<{ open: boolean, data: {} | null }>({ open: false, data: null })
    const tabtype = useSearchParams().get('tab')
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