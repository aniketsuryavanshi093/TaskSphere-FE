"use client"
import PageHeaderTitle from '@/app/_components/UI/PageHeaderTitle'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { Button } from 'reactstrap'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { AiOutlineUserAdd } from 'react-icons/ai'
import "./manageticket.scss"
import AddUserModel from '@/app/_components/Models/AddUserModel'
import { useSession } from 'next-auth/react'

const TicketLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data } = useSession()
    const path = usePathname()
    const { id } = useParams()
    const [AdduserModal, setAddUserModal] = useState<{ open: boolean }>({ open: false })
    return (
        <div>
            <div className='wrapper justify-between w-100'>
                <PageHeaderTitle title={path?.includes('createticket') ? "Create Ticket" : "Manage Ticket"} isRedirectto="/dashboard/manageticket" />
                <div>
                    {
                        !!id && data?.user?.role === "organization" && (
                            <Button className=' ticktcreatebtn me-3' onClick={() => setAddUserModal({ open: true })}>
                                <div className='wrapper'>
                                    <AiOutlineUserAdd className='addicon' />
                                    <span className='btntext'>Add User</span>
                                </div>
                            </Button>
                        )
                    }
                    <Link prefetch={false} href={`/dashboard/manageticket/createticket${id ? `?projectId=${id}` : ""}`} >
                        <Button className=' ticktcreatebtn' >
                            <div className='wrapper'>
                                <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                                <span className='btntext'>Create Ticket</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
            {
                children
            }
            {
                AdduserModal?.open && (
                    <AddUserModel isOpen={AdduserModal.open} onClose={() => setAddUserModal({ open: false, })} isMulti={false} />
                )
            }
        </div>
    )
}
export default TicketLayout