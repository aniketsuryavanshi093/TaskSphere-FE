"use client"
import PageHeaderTitle from '@/app/_components/UI/PageHeaderTitle'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { Button } from 'reactstrap'
import "./manageticket.scss"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TicketLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const path = usePathname()
    console.log(path);

    return (
        <div>
            <div className='wrapper justify-between w-100'>
                <PageHeaderTitle title={path?.includes('createticket') ? "Create Ticket" : "Manage Ticket"} isRedirectto="/dashboard/manageticket" />
                <div>
                    <Link prefetch={false} href={"/dashboard/manageticket/createticket"} >
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
        </div>
    )
}
export default TicketLayout