import React, { useState, useEffect } from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'
import "./ticketinfo.scss"
import { CurrentUserObjectType, TaskType } from '@/commontypes'
import CustomDropDownButton from '../../CustomDropDownButton/CustomDropDownButton'
import { label, priority, statusoptions } from '@/constants'
import useGetProjectUsers from '@/hooks/UseQuery/UsersQueryHook/useGetProjectUsers'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import HtmlConverter from "@/app/_components/HTMLparser/HtmlConverter"
import moment from 'moment'

type pageprops = {
    isopen: boolean
    ticketData: TaskType
    onClosed: () => void
}

const TicketInfo: React.FC<pageprops> = ({ isopen, onClosed, ticketData }) => {
    const [isFull, setisFull] = useState(false)
    const ticketInfoWrapperStyle: React.CSSProperties = {
        width: isFull ? '77%' : '37%',
        transition: 'width ease 0.3s',
    };

    const [UsersList, setUsersList] = useState<[{ value: string, img?: string, label: string, name?: string }]>([{ value: "all", label: "all" }])
    const { data } = useSession()
    const { id } = useParams()

    const { data: usersData, } = useGetProjectUsers(data, id)
    useEffect(() => {
        if (usersData?.data?.data?.members?.length) {
            const temp: [{ value: string, img?: string, label: string, name?: string }] = usersData?.data?.data?.members.map((_user: CurrentUserObjectType) => ({
                value: _user._id, label: _user.userName, name: _user.userName, img: _user.profilePic || "/images/icons/userdummy.avif"
            }))
            temp.push({
                value: usersData?.data?.data?.organizationId?._id, img: usersData?.data?.data?.organizationId?.profilePic || "/images/icons/userdummy.avif", label: usersData?.data?.data?.organizationId?.userName, name: usersData?.data?.data?.organizationId?.userName,
            })
            setUsersList(temp)
        }
    }, [usersData])

    return (
        <Offcanvas
            direction="end" style={ticketInfoWrapperStyle}
            isOpen={isopen}
            onClosed={onClosed}
            fade={false}
        >
            <OffcanvasHeader toggle={onClosed}>
                <div className='wrapper w-100 justify-between'>
                    <p className='mb-0'>
                        {ticketData?.ticketTag}
                    </p>
                    {
                        isFull ? (
                            <i onClick={() => setisFull(!isFull)} className=" cp fa-solid fa-down-left-and-up-right-to-center"></i>
                        )
                            : (
                                <i onClick={() => setisFull(!isFull)} className=" cp fa-solid fa-up-right-and-down-left-from-center"></i>
                            )
                    }
                </div>
            </OffcanvasHeader>
            <OffcanvasBody>
                <div className={`wrapper  ${isFull ? "flex-row-reverse" : "flex-column"}  align-start w-100 `}>
                    <div className={`ticketinfodiv ${isFull && "ps-4"} w-100 `}>
                        <p className='tickettitle'>{ticketData.title}</p>
                        <div className='ticketinfostack w-100'>
                            <div className='wrapper justify-start my-3 w-100'>
                                <div className='labelticketinfo'>Status</div>
                                <div className='w-100 ticketinfoproperty'>
                                    <CustomDropDownButton
                                        classname='statusselect'
                                        selectedvalue={ticketData.status}
                                        defaultValue={ticketData.status}
                                        onDropdownSelect={value =>
                                            console.log(value)
                                        }
                                        options={statusoptions}
                                    />
                                </div>
                            </div>
                            <div className='wrapper my-3 justify-start w-100'>
                                <div className='labelticketinfo'>Assignee</div>
                                <div className='w-100 ticketinfoproperty'>
                                    <CustomDropDownButton
                                        classname='statusselect'
                                        defaultValue={ticketData.assignedTo}
                                        onDropdownSelect={value =>
                                            console.log(value)
                                        }
                                        options={UsersList} onselectIcon
                                    />
                                </div>
                            </div>
                            <div className='wrapper justify-start my-3 w-100'>
                                <div className='labelticketinfo'>Priority</div>
                                <div className='w-100 ticketinfoproperty'>
                                    <CustomDropDownButton
                                        defaultValue={ticketData.priority}
                                        classname='statusselect'
                                        onselectIcon
                                        onDropdownSelect={value => {
                                            console.log(value)
                                        }}
                                        options={priority}
                                    />
                                </div>
                            </div>
                            <div className='wrapper justif~y-start my-3 w-100'>
                                <div className='labelticketinfo'>Label</div>
                                <div className='w-100 ticketinfoproperty'>
                                    <CustomDropDownButton
                                        defaultValue={ticketData.label}
                                        classname='statusselect'
                                        onDropdownSelect={value =>
                                            console.log(value)
                                        }
                                        options={[...label]}
                                    />
                                </div>
                            </div>
                            <div className='wrapper justify-start my-3 w-100'>
                                <div className='labelticketinfo'>Reporter</div>
                                <div className='w-100 ticketinfoproperty'>
                                    <div className='wrapper justify-start'>
                                        {
                                            UsersList?.map(({ value, img, name }) =>
                                                value === (ticketData.createdBy || ticketData.createdByOrg) && (
                                                    <>
                                                        <Image width={30} height={30} src={img} alt={''} />
                                                        <p className='mb-0 ms-3'> {name} </p>
                                                    </>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='wrapper flex-column mt-2 p justify-start align-start'>
                            <p className='text_muted datetext mb-1'>Created {moment(new Date(ticketData.createdAt).toLocaleString()).fromNow()}</p>
                            <p className='text_muted datetext mb-0'>Updated {moment(new Date(ticketData.updatedAt).toLocaleString()).fromNow()}</p>
                        </div>
                    </div>
                    <div style={isFull ? {} : { borderTop: '2px solid var(--border-color)' }} className={`ticketdescomments ${isFull && "commentdescscrollbar"} pe-2 mt-2`}>
                        <div className='w-100 mt-2'>
                            <p className='descriptionsub'>Description</p>
                        </div>
                        <div className='w-100'>
                            <HtmlConverter htmlString={ticketData.description} />
                        </div>
                    </div>
                </div>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default TicketInfo