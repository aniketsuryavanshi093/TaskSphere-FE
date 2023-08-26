"use client"
import PageHeaderTitle from '@/app/_components/UI/PageHeaderTitle'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Button } from 'reactstrap'
import "./admin.scss"
import Link from 'next/link'

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div>
            <div className='wrapper justify-between w-100'>
                <PageHeaderTitle title="Administration" isRedirectto="/dashboard/admin" />
                <div>
                    <Link href={"/dashboard/admin/createproject"} >
                        <Button className=' admincreatebtn' >
                            <div className='wrapper'>
                                <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                                <span className='btntext'>Create Project</span>
                            </div>
                        </Button>
                    </Link>
                    <Link href={"/dashboard/admin/createuser"} >
                        <Button className='admincreatebtn mx-3'  >
                            <div className='wrapper'>
                                <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                                <span className='btntext'>Create User</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
            {
                children
            }
        </div>
    )
}
export default AdminLayout