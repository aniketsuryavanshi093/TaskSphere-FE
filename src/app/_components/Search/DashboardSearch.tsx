import React, { useState } from 'react'
import Search from './Search'
import { useQuery } from '@tanstack/react-query'
import { getTiccketSearch } from '@/apiServices/ticket/ticketservices'
import { useSession } from 'next-auth/react'
import { TaskType } from '@/commontypes'
import Link from 'next/link'
import { GetPriority } from '../UI/DragAndDrop/Task/Task'
import Image from 'next/image'
import { concatString } from '@/lib'
import { setTicketInfoClosed, setTicketInfoOpen } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import TicketInfo from '../UI/TicketInfo/TicketInfo'

const DashboardSearch = () => {
    const [SearchKey, setSearchKey] = useState("")
    const onSetvalue = (searchkey: string) => {
        setSearchKey(searchkey)
    }
    const { data } = useSession()
    const { data: ticketsearch, isLoading } = useQuery({
        queryFn: () => getTiccketSearch({ search: SearchKey, authToken: data?.user?.authToken }),
        queryKey: ['search', `${SearchKey}`],
        enabled: !!SearchKey.length,
        staleTime: 5 * 60 * 100
    })
    const [ProjectID, setProjectID] = useState("")
    const { ticketInfo } = useAppSelector((state) => state.manageticketreducer);
    const dispatch = useAppDispatch()
    const SearchDataComponent = () => {
        return (
            <div className="dashboardsearch">
                {
                    (!isLoading && !!ticketsearch?.data.data.tickets.list.length) ? (
                        <>
                            {ticketsearch?.data.data.tickets.list?.map((elem: TaskType) => (
                                <div className="my-2" key={elem._id}  >
                                    <div className="wrapper my-2 justify-start cp">
                                        <Link prefetch={false} href={`/dashboard/project/${elem.project._id}`} className='wrapper justify-start '>
                                            <Image src={elem.project.logoUrl || "/images/icons/noimage.webp"} alt={elem.project.title} width={50} height={50} unoptimized />
                                        </Link>
                                        <div onClick={() => {
                                            dispatch(setTicketInfoOpen(elem))
                                            setProjectID(elem.project._id)
                                        }} className='wrapper mx-2 flex-column align-start'>
                                            <p className="mb-0 nowrap">{concatString(40, elem.title)}({elem.ticketTag})</p>
                                            <div className='wrapper justify-start'>
                                                <GetPriority type="icon" priority={elem.priority} />
                                                <p className="mb-0 ms-3 text_muted">{elem.label}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) :
                        (
                            <div className="w-100 wrapper" style={{ height: "100px" }}>
                                <p className="mb-0"> No Results found 😭 </p>
                            </div>
                        )
                }
            </div>
        )
    }
    return (
        <>
            <Search searchLoading={isLoading} searchData={ticketsearch ? ticketsearch?.data?.data?.tickets?.list : []} SearchDataComponent={SearchDataComponent} setValue={onSetvalue} waitTime={1000} placeholder='Search for anything...' />
            {ticketInfo?.isopen && (
                <TicketInfo
                    isopen={ticketInfo?.isopen}
                    ticketData={ticketInfo?.ticketdata}
                    projectId={ProjectID}
                    onClosed={() => dispatch(setTicketInfoClosed())}
                />
            )}
        </>
    )
}

export default DashboardSearch