"use client"
import Circularbar from '@/app/_components/Circularbar/Circularbar'
/* eslint-disable react/jsx-key */
import { projectTypes } from '@/commontypes'
import useGetAllOrganizationsProjecthook from '@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const ManageTicket = () => {
    const { data } = useSession()
    const { data: orgproject, isLoading } = useGetAllOrganizationsProjecthook(data)
    return (
        <div className='w-100'>
            <div className='projectsgrid w-100'>
                {
                    orgproject?.data?.data?.projects.map((elem: projectTypes) => (
                        <div className='projectcard position-relative'>
                            <div className='projectlogo'>
                                <Image alt='title' src={elem.logoUrl || "/images/github.png"} width={200} height={165} />
                            </div>
                            <div className='projectgraph'>
                                <div className='wrapper'>
                                    <Circularbar value={30} textColor='green' pathColor='green' />
                                    <Circularbar value={20} textColor='blue' pathColor='blue' />
                                    <Circularbar value={50} textColor='yellow' pathColor='yellow' />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ManageTicket