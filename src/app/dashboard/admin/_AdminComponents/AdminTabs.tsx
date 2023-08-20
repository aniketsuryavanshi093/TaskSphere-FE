'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AdminTabs: React.FC<{ setSelectedTab?: React.Dispatch<React.SetStateAction<string>>, SelectedTab: string }> = ({ setSelectedTab, SelectedTab }) => {
    const router = useRouter()
    return (
        <div className='wrapper justify-start tabwrapper'>
            <ul className='d-flex tabul wrapper justify-between'>
                <li onClick={() => {
                    if (SelectedTab !== 'project') {
                        router.push('/dashboard/admin?tab=project')
                    }
                }}
                    className={SelectedTab === "project" ? "selected" : ""}>
                    Projects
                </li>
                <li onClick={() => {
                    if (SelectedTab !== 'users') {
                        router.push('/dashboard/admin?tab=users')
                    }
                }}
                    className={SelectedTab === "users" ? "selected" : ""}>
                    Users
                </li>
            </ul>
        </div>
    )
}

export default AdminTabs