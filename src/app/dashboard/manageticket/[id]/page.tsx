"use client"
import React, { useEffect, useState, useTransition } from 'react'
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import { Placeholder } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '@/redux/dashboardstore/hook'
import { DragDropCOlumnstype, TaskType } from '@/commontypes'
import { DropResult } from 'react-beautiful-dnd'
import { updateTicketAction } from '@/actions/authactions/ticketadminactions'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import TicketInfo from '@/app/_components/UI/TicketInfo/TicketInfo'
import { setTicketInfoClosed } from '@/redux/dashboardstore/reducer/managetickets/manageticket'
import ProjectsTicketsFilters from '@/app/_components/ProjectTaskFilter/ProjectsTicketsFilters'
import "./ticketmanage.scss"
import useUpdateTicketHook from '@/hooks/useUpdateTicketHook'
import DragDropLoader from '@/app/_components/UI/DragAndDrop/DragDropLoader/DragDropLoader'

export type ticketUpdateValuesType = {
    status: string;
    updatedBy: string | undefined;
    currentstatus: string | undefined;
    assignedTo: string | undefined;
    projectId: string | string[];
    ticketId: string;
}

const ProjectTickets = () => {
    const { ticketInfo } = useAppSelector((state) => state.manageticketreducer)
    const [Loading, setLoading] = useState<boolean>(false)
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(null)
    const [isPending, startTransition] = useTransition()
    const { handleUpdateTicket } = useUpdateTicketHook()
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
            {
                ticketInfo?.isopen && (
                    <TicketInfo isopen={ticketInfo?.isopen} ticketData={ticketInfo?.ticketdata} onClosed={() => dispatch(setTicketInfoClosed())} />
                )
            }
        </div>
    )
}

export default ProjectTickets

