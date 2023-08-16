'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from 'reactstrap'
import "./admin.scss"

const AdminPage = () => {

    return (
        <div>
            <div className='wrapper justify-end w-100'>
                <Button className=' admincreatebtn' >
                    <div className='wrapper'>
                        <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                        <span className='btntext'>Create Project</span>
                    </div>
                </Button>
                <Button className='admincreatebtn mx-3'  >
                    <div className='wrapper'>
                        <Image className='me-2' height={16} width={16} src="/images/icons/user.svg" alt='user' />
                        <span className='btntext'>Create User</span>
                    </div>
                </Button>
            </div>
        </div>
    )

}

export default AdminPage