"use client"
import React, { useEffect, useState } from 'react'
import ProjectsTicketsFilters from './components/ProjectsTicketsFilters'
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import { Placeholder } from 'reactstrap'
import "./ticketmanage.scss"
import { useAppSelector } from '@/redux/dashboardstore/hook'
import { DragDropCOlumnstype, TaskType } from '@/commontypes'

const ProjectTickets = () => {
    const [Loading, setLoading] = useState<boolean>(false)
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(null)
    const [Tickets, setTickets] = useState(null)
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
                            <DraggableContext dragDropdata={dragDropData} />
                        )
                }
            </div>
        </div>
    )
}

export default ProjectTickets

