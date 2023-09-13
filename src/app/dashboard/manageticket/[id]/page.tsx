"use client"
import React, { useEffect, useState, useTransition } from 'react'
import ProjectsTicketsFilters from './components/ProjectsTicketsFilters'
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import { Placeholder } from 'reactstrap'
import "./ticketmanage.scss"
import { useAppSelector } from '@/redux/dashboardstore/hook'
import { DragDropCOlumnstype, TaskType } from '@/commontypes'
import { DropResult } from 'react-beautiful-dnd'
import { updateTicketAction } from '@/actions/authactions/ticketadminactions'
import enqueSnackBar from '@/lib/enqueSnackBar'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

export type ticketUpdateValuesType = {
    status: string;
    updatedBy: string | undefined;
    assignedTo: string | undefined;
    projectId: string | string[];
    ticketId: string;
}

const ProjectTickets = () => {
    const { filterURLValue } = useAppSelector((state) => state.manageticketreducer)
    const [Loading, setLoading] = useState<boolean>(false)
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(null)
    const [isPending, startTransition] = useTransition()
    const { data } = useSession()
    const queryClient = useQueryClient()
    const [Tickets, setTickets] = useState(null)
    const { id } = useParams()
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
    const handleUpdateTicket = async (values: ticketUpdateValuesType) => {
        try {
            const result = await updateTicketAction(values) as { status: string, message: string }
            console.log(result);
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            // queryClient.invalidateQueries({ queryKey: ['tickets', `${id}${filterURLValue?.string || ""}`], })
            enqueSnackBar({ type: "success", message: "Ticket Updated Successfully!" })
        } catch (error) {
            console.log(error)
        }
    }
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

            <ProjectsTicketsFilters setTickets={setTickets} setloading={(e) => setLoading(e)} />
            <p className='mb-1 projecttitle'>{selectedProject?.title}</p>
            <div className='w-100'>
                {
                    Loading ? (
                        <Placeholder animation='wave' className='dragdroparealoader' tag="div" >
                            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
                            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
                            <Placeholder tag='div' className='taskclumnwrapperloader wrapper flex-wrap gap-2 align-start'></Placeholder>
                        </Placeholder>
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

