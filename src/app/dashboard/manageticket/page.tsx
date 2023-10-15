"use client"
import Circularbar from '@/app/_components/Circularbar/Circularbar'
import NumberAnimation from '@/app/_components/UI/AnimateNumbers'
/* eslint-disable react/jsx-key */
import { projectTypes } from '@/commontypes'
import useGetProjectsByUserhook from '@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectsByUserhook'
import useGetAllOrganizationsProjecthook from '@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook'
import { useAppDispatch } from '@/redux/dashboardstore/hook'
import { setselectedProject } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ManageTicket = () => {
    const { data } = useSession()
    const dispatch = useAppDispatch()
    const { data: userproject, isLoading: userisLoading } = useGetProjectsByUserhook(data)
    const { data: orgproject, isLoading: orgisLoading } = useGetAllOrganizationsProjecthook(data, null, false, true)
    console.log((orgproject || userproject)?.data?.data?.projects, orgproject, userproject);
    return (
        <div className='w-100'>
            {(orgproject || userproject)?.data?.data?.projects?.length ? (
                <div className='projectsgrid my-3 scrollbar w-100'>
                    {
                        (orgproject || userproject)?.data?.data?.projects?.map((elem: projectTypes) => (
                            <Link prefetch={false} onClick={() => {
                                dispatch(setselectedProject(elem))
                            }} href={`/dashboard/manageticket/${elem._id}`}>
                                <div className='projectcard position-relative'>
                                    <div className='projectlogo'>
                                        <Image alt='title' src={elem.logoUrl || "/images/github.png"} width={200} height={165} />
                                    </div>
                                    <div className='m-2'>
                                        <p className='projectTitle mb-0 '>{elem?.title}</p>
                                    </div>
                                    <div className='wrapper justify-start mx-2'>
                                        <div className='wrapper flex-column'>
                                            <p className='mb-0 projecttask'>Tasks</p>
                                            <NumberAnimation start={0} end={elem.ticketsCount} duration={300} />
                                        </div>
                                        <div className='wrapper mx-3 flex-column'>
                                            <p className='mb-0 projecttask'>Members</p>
                                            <NumberAnimation start={0} end={elem.members?.length} duration={300} />
                                        </div>
                                    </div>
                                    <div className='wrapper mx-2 flex-column align-start'>
                                        <p className='text_muted mb-0 project_subdate'>Last Updated</p>
                                        <p className='mb-0 projectdate' >{moment(new Date(elem.updatedAt).toLocaleString()).fromNow()}</p>
                                    </div>
                                    <div className='projectgraph'>
                                        <div className='wrapper justify-around'>
                                            <div className='wrapper datacard flex-column'>
                                                <p className='mb-0 text-small'>Done</p>
                                                <Circularbar value={30} textColor='green' background="white" pathColor='green' />
                                            </div>
                                            <div className='wrapper datacard flex-column'>
                                                <p className='mb-0 text-small'>To Do</p>
                                                <Circularbar value={20} textColor='blue' background="white" pathColor='blue' />
                                            </div>
                                            <div className='wrapper datacard flex-column'>
                                                <p className='mb-0 text-small'>progress</p>
                                                <Circularbar value={50} textColor='orange' background="white" pathColor='orange' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))


                    }
                </div>
            )
                :
                (
                    <div className='wrapper mt-5 '>
                        <p className='text_primary pt-4 text_bold '>No Projects found!.
                            {data?.user?.role === "organization" ? <Link className="createprojectredirtext" prefetch={false} href="/dashboard/admin/createproject" >create project</Link> : null}
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default ManageTicket
