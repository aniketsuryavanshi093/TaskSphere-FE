"use client"
import PageHeaderTitle from '@/app/_components/UI/PageHeaderTitle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Button } from 'reactstrap'
import "./admin.scss"

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter()
    return (
        <div>
            <div className='wrapper justify-between w-100'>
                <PageHeaderTitle title="Administration" />
                <div>
                    <Button onClick={() => router.push('/dashboard/admin/createproject')} className=' admincreatebtn' >
                        <div className='wrapper'>
                            <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                            <span className='btntext'>Create Project</span>
                        </div>
                    </Button>
                    <Button onClick={() => router.push('/dashboard/admin/createuser')} className='admincreatebtn mx-3'  >
                        <div className='wrapper'>
                            <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                            <span className='btntext'>Create User</span>
                        </div>
                    </Button>
                </div>
            </div>
            {
                children
            }
        </div>
    )
}
export default AdminLayout