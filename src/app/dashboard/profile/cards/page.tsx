"use client"
import { FormGroup, Input, Label } from 'reactstrap'
import React, { useEffect, useState, } from 'react'
import { useSession } from 'next-auth/react'
import useGetProjectsByUserhook from '@/hooks/UseQuery/ProjectsQueryHooks/useGetProjectsByUserhook'
import useGetAllOrganizationsProjecthook from '@/hooks/UseQuery/ProjectsQueryHooks/usegetAllOrganizationsProjecthook'
import useTicketsQueryhook from '@/hooks/UseQuery/ticketmanagementhooks/useTicketsQueryhook'
import { DragDropCOlumnstype, TaskType } from '@/commontypes'
import DragDropLoader from '@/app/_components/UI/DragAndDrop/DragDropLoader/DragDropLoader'
import DraggableContext from '@/app/_components/UI/DragAndDrop/DraggAbleContext/DraggableContext'
import useDragEndHook from '@/app/_components/UI/DragAndDrop/useDragEndHook'
import TaskFilter from '../../tasks/_taskcomponent/TaskFilter'
import AllTaskList from '../../tasks/_taskcomponent/AllTaskList'
import "../../tasks/tasks.scss"

const Task = () => {
    const { data } = useSession()
    const { data: userproject, isLoading: userprojectload } = useGetProjectsByUserhook(data)
    const [showDone, setshowDone] = useState<boolean>(false)
    const { data: orgProjects, } = useGetAllOrganizationsProjecthook(data)
    const [dragDropData, setdragDropData] = useState<DragDropCOlumnstype | null>(
        null
    );
    const [ProjectId, setProjectId] = useState<{ id: string, label: string }>({ id: "", label: "" })
    const { data: tickets, isLoading } = useTicketsQueryhook({ id: ProjectId.id, filterURLValue: `&isforUser=true${showDone ? '&notshowDone=true' : ""}`, frompage: true })
    const { onDragEnd } = useDragEndHook(ProjectId.id)
    useEffect(() => {
        if (tickets?.data?.data?.tickets?.list?.length && ProjectId) {
            let res: DragDropCOlumnstype = {
                pending: {
                    title: "To Do",
                    color: "#5030E5",
                    items: [],
                },
                progress: {
                    title: "On Progress",
                    color: "#FFA500",
                    items: [],
                },
                done: {
                    title: "Done",
                    color: "#8BC48A",
                    items: [],
                },
            };
            tickets.data.data.tickets?.list?.forEach((elem: TaskType) => {
                switch (elem.status) {
                    case "pending":
                        res.pending.items = [...res.pending.items, elem];
                        break;
                    case "progress":
                        res.progress.items = [...res.progress.items, elem];
                        break;
                    case "done":
                        res.done.items = [...res.done.items, elem];
                        break;
                    default:
                        break;
                }
            });
            setdragDropData(res);
        } else {
            setdragDropData(null);
        }
    }, [tickets, ProjectId]);
    return (
        <div>
            <div className='wrapper justify-between'>
                <h4 className='no-wrap mb-0' >Tasks assigned to me</h4>
                <div className='wrapper justify-end'>
                    <FormGroup check className='mb-0'>
                        <Input
                            id="exampleCheck"
                            onChange={(e) => {
                                setshowDone(!e.target.checked)
                            }}
                            name="check"
                            style={{ border: "1px solid " }}
                            type="checkbox"
                        />
                        <Label
                            check
                            className='no-wrap'
                            for="exampleCheck"
                        >
                            Show Finished Tasks
                        </Label>
                    </FormGroup>
                    <TaskFilter projects={userproject || orgProjects} ProjectId={ProjectId} setProjectId={setProjectId} />
                </div>
            </div>
            <div className='w-100 py-2 projecttitle'>
                <p className='mb-0 no-wrap'>
                    {!ProjectId.id ? "All Task" : ProjectId.label}
                </p>
                {
                    !ProjectId.id ?
                        (
                            isLoading ? (
                                <DragDropLoader />
                            ) : (
                                tickets?.data?.data?.tickets?.list?.length > 0 ?
                                    (
                                        <AllTaskList taskList={tickets?.data?.data?.tickets?.list} />
                                    ) :
                                    (
                                        <div className='wrapper mt-5 '>
                                            <p className='text_primary pt-4 text_bold '>No task found!.</p>
                                        </div>
                                    )
                            )
                        )
                        :
                        (
                            isLoading ? (
                                <DragDropLoader />
                            ) : (
                                <DraggableContext onDragEnd={onDragEnd} dragDropdata={dragDropData} />
                            )
                        )
                }
            </div>
        </div>
    )
}

export default Task