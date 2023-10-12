import { GetPriority } from '@/app/_components/UI/DragAndDrop/Task/Task'
import { TaskType } from '@/commontypes'
import { useAppDispatch } from '@/redux/dashboardstore/hook'
import { setTicketInfoOpen } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import Image from 'next/image'
import React from 'react'

const AllTaskList: React.FC<{ taskList: TaskType[] }> = ({ taskList }) => {
    const dispatch = useAppDispatch()
    return (
        <div className='w-100 tasklistwrapper py-3'>
            {
                taskList.map((item: TaskType, i) => (
                    <div
                        key={item._id}
                        className='taskinfolist position-relative'
                    >
                        <div className='w-100  '>
                            <GetPriority type="label" priority={item.priority} />
                            <p className='tasktag mb-0 my-2' onClick={() => dispatch(setTicketInfoOpen(item))}>{item.ticketTag}</p>
                            <p className='tasktitle mb-2'>{item.title}</p>
                            <div className='wrapper taskions justify-between'>
                                <div className='wrapper justify-start'>
                                    <GetPriority type="icon" priority={item.priority} />
                                    <p className='tasklabel mx-2'>{item.label}</p>
                                </div>
                                <div className='wrapper justify-start'>
                                    <Image alt='comments' src="/images/icons/commnets.svg" width={16}
                                        height={16} />
                                    <p className='commentstasklist mb-0 ms-1'>{item.commentsCount} comments</p>
                                </div>
                            </div>
                            <div data-tooltip={`${item.assignedUser.userName}:${item.assignedUser.name}`} className='usertask' id={`DisabledAutoHideExample${i}`}>
                                <Image src={item.assignedUser.profilePic || "/images/icons/userdummy.avif"} alt='dummy' className='rounded-pill' width={40} height={40} />
                            </div>
                        </div>
                    </div>
                ))

            }

        </div>
    )
}

export default AllTaskList