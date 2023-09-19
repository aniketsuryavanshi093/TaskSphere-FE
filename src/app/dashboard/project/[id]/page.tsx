"use client"
import React, { useEffect, useState, useTransition } from 'react'
import Image from 'next/image'
import { Placeholder } from 'reactstrap'
import { useSession } from 'next-auth/react'
import useGetProjectDetails from '@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectDetails'
import { useParams } from 'next/navigation'
import { CurrentUserObjectType, DragDropCOlumnstype, TaskType } from '@/commontypes'
import ProjectsTicketsFilters from '@/app/_components/ProjectTaskFilter/ProjectsTicketsFilters'
import "./projectpage.scss"
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import { DropResult } from 'react-beautiful-dnd'
import TicketInfo from '@/app/_components/UI/TicketInfo/TicketInfo'
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import { setTicketInfoClosed } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import AddUserModel from '@/app/_components/Models/AddUserModel'
import { ticketUpdateValuesType } from '../../manageticket/[id]/page'
import DragDropLoader from '@/app/_components/UI/DragAndDrop/DragDropLoader/DragDropLoader'
import useUpdateTicketHook from '@/hooks/useUpdateTicketHook'

const ProjectPage = () => {
    const { id } = useParams()
    const [Loading, setLoading] = useState<boolean>(false)
    const [Tickets, setTickets] = useState(null)
    const { ticketInfo } = useAppSelector((state) => state.manageticketreducer)
    const [pending, startTransition] = useTransition()
    const { handleUpdateTicket } = useUpdateTicketHook()
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(null)
    const { data } = useSession()
    const dispatch = useAppDispatch()
    const [AdduserModal, setAddUserModal] = useState<{ open: boolean }>({ open: false })
    const { data: projectDetails, isLoading, } = useGetProjectDetails(data, id, false)
    useEffect(() => {
        if (Tickets?.data?.data?.tickets?.list?.length) {
            let res: DragDropCOlumnstype = {
                "pending": {
                    title: 'To Do',
                    color: "#5030E5",
                    items: [],
                },
                "progress": {
                    title: 'On Progress',
                    color: "#FFA500",
                    items: [],
                },
                "done": {
                    title: 'Done',
                    color: "#8BC48A",
                    items: [],
                }
            };
            Tickets.data.data.tickets?.list?.forEach((elem: TaskType) => {
                switch (elem.status) {
                    case "pending":
                        res.pending.items = [...res.pending.items, elem]
                        break;
                    case "progress":
                        res.progress.items = [...res.progress.items, elem]
                        break;
                    case "done":
                        res.done.items = [...res.done.items, elem]
                        break;
                    default:
                        break;
                }
            })
            setdragDropData(res)
        } else {
            setdragDropData(null)
        }
    }, [Tickets])
    const onDragEnd = async (result: DropResult, columns: DragDropCOlumnstype | null, setColumns: React.Dispatch<React.SetStateAction<DragDropCOlumnstype | null>>) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const values: ticketUpdateValuesType = {
                "status": destination.droppableId,
                "updatedBy": data?.user.id,
                "assignedTo": columns[source.droppableId].items.find(el => el._id === result.draggableId)?.assignedTo,
                "projectId": id,
                ticketId: result.draggableId
            }
            startTransition(() => handleUpdateTicket(values))
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setTicketInfoClosed())
        }
    }, [dispatch])

    return (
        <div>
            <div className='wrapper justify-between w-100'>
                {
                    isLoading && <Placeholder animation='wave'>
                        <Placeholder className='placeholderload' as="p"></Placeholder>
                    </Placeholder>
                }
                <h4 className='projecttitlep mb-0'>
                    {projectDetails?.data?.data?.project?.title}
                </h4>
                <div className='wrapper'>
                    {
                        (data?.user?.role === "organization") && (
                            <div className='invitebtn me-3 cp' onClick={() => setAddUserModal({ open: true })}>
                                <Image height={18} width={18} alt="invitentn" className='me-2' src="/images/icons/add-square.svg" />
                                <span>Invite</span>
                            </div>
                        )
                    }
                    <div className='wrapper position-relative'>
                        {
                            isLoading && (
                                <Placeholder animation='wave'>
                                    {Array(4).fill(0).map((_, index) => (
                                        <Placeholder key={index} typeof="img" style={{ height: "38px", width: "38px", right: index > 0 ? `${5 * index}px` : "" }} className='userimagediv userimagedivplaceholder  position-relative' >
                                        </Placeholder>
                                    ))}
                                </Placeholder>
                            )
                        }
                        {
                            projectDetails?.data?.data?.project?.members?.length && [...projectDetails?.data?.data?.project?.members, projectDetails?.data?.data?.project?.organizationId].slice(0, 4).map((user: CurrentUserObjectType, index) => (
                                <div key={index} data-tooltip={user.name} className='userimagediv  position-relative' style={{ right: index > 0 ? `${5 * index}px` : "" }}>
                                    <Image src={user.profilePic || "/images/icons/userdummy.avif"} height={38} width={38} alt='users' />
                                </div>
                            ))
                        }
                        {
                            projectDetails?.data?.data?.project?.members?.length > 3 && (
                                <div className='userimagediv wrapper position-relative' style={{ right: `20px` }}>
                                    <span>+{projectDetails?.data?.data?.project?.members?.length - 3}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <ProjectsTicketsFilters type='project' setTickets={setTickets} setloading={(e) => setLoading(e)} />
            <div className='w-100'>
                {
                    Loading ? (
                        <DragDropLoader />
                    )
                        :
                        (
                            <DraggableContext onDragEnd={onDragEnd} dragDropdata={dragDropData} />
                        )
                }
            </div>
            {
                ticketInfo?.isopen && (
                    <TicketInfo isopen={ticketInfo?.isopen} ticketData={ticketInfo?.ticketdata} onClosed={() => dispatch(setTicketInfoClosed())} />
                )
            }
            {
                AdduserModal?.open && (
                    <AddUserModel isOpen={AdduserModal.open} onClose={() => setAddUserModal({ open: false, })} isMulti={false} />
                )
            }
        </div>
    )
}

export default ProjectPage