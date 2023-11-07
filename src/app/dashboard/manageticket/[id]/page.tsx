"use client"
import React, { useEffect, useState, } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import { DragDropCOlumnstype, TaskType } from '@/commontypes'
import TicketInfo from '@/app/_components/UI/TicketInfo/TicketInfo'
import { setTicketInfoClosed } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import ProjectsTicketsFilters from '@/app/_components/ProjectTaskFilter/ProjectsTicketsFilters'
import DragDropLoader from '@/app/_components/UI/DragAndDrop/DragDropLoader/DragDropLoader'
import useDragEndHook from '@/app/_components/UI/DragAndDrop/useDragEndHook'
import "./ticketmanage.scss"

export type ticketUpdateValuesType = {
    status: string;
    updatedBy: string | undefined;
    currentstatus: string | undefined;
    ticketDatachanged?: string,
    priority?: string;
    assignedTo: string | undefined;
    projectId: string | string[];
    ticketId: string;
}

const ProjectTickets = () => {
    const { ticketInfo } = useAppSelector((state) => state.manageticketreducer)
    const [Loading, setLoading] = useState<boolean>(false)
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(null)
    const { data } = useSession()
    const [Tickets, setTickets] = useState(null)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { selectedProject } = useAppSelector((state) => state.manageticketreducer)
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
    const { onDragEnd } = useDragEndHook(id as string)
    return (
        <div>
            <ProjectsTicketsFilters type='manageticket' setTickets={setTickets} setloading={(e) => setLoading(e)} />
            <p className='mb-1 projecttitle'>{selectedProject?.title}</p>
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

        </div>
    )
}

export default ProjectTickets

