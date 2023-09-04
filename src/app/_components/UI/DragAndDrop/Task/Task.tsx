"use client"
import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import "./task.scss"
import { Tooltip, UncontrolledTooltip } from 'reactstrap';
import Image from 'next/image'

type pageprops = {
    key: number;
    item: any;
    index: number
}
const TaskCard: React.FC<pageprops> = ({ item, index }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                if (snapshot.isDragging) {
                    provided.draggableProps.style.left = provided.draggableProps.style.offsetLeft;
                    provided.draggableProps.style.top = provided.draggableProps.style.offsetTop;
                }
                return (
                    <div
                        style={{
                            ...provided.draggableProps.style,
                            left: "auto !important", top: "auto !important"
                        }}
                        className='taskinfo position-relative'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <div className='w-100  '>
                            <GetPriority type="label" priority={item.priority} />
                            <p className='tasktag mb-0 my-2'>Con-123</p>
                            <p className='tasktitle mb-2'>{item.Task}</p>
                            <div className='wrapper taskions justify-between'>
                                <div className='wrapper justify-start'>
                                    <GetPriority type="icon" priority={item.priority} />
                                    <p className='tasklabel mx-2'>{item.label}</p>
                                </div>
                                <div className='wrapper justify-start'>
                                    <Image alt='comments' src="/images/icons/commnets.svg" width={16}
                                        height={16} />
                                    <p className='commentstask mb-0 ms-1'>12 comments</p>
                                </div>
                            </div>
                            <div onMouseOver={() => setTooltipOpen(true)} onMouseLeave={() => setTooltipOpen(false)} className='usertask' id={`DisabledAutoHideExample${index}`}>
                                <Image src="/images/icons/userdummy.avif" alt='dummy' className='rounded-pill' width={40} height={40} />
                                <Tooltip
                                    placement="top"
                                    isOpen={tooltipOpen}
                                    autohide={false}
                                    target={`DisabledAutoHideExample${index}`}
                                    toggle={toggle}
                                >
                                    Try to select this text!
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                );
            }}

        </Draggable>
    )
}

export default TaskCard

const GetPriority: React.FC<{ priority: string, type: string }> = ({ priority, type }) => {
    if (type === "label") {
        switch (priority) {
            case "low":
                return <p style={{ background: "#b47ff9" }} className='priorityindicator'>Low</p>
            case "high":
                return <p style={{ background: "#f8508a" }} className='priorityindicator'>High</p>
            case "medium":
                return <p style={{ background: "#e7cb4d" }} className='priorityindicator'>Medium</p>
            default:
                return null
        }
    } else {
        switch (priority) {
            case "low":
                return <Image src="https://jira.solulab.com/images/icons/priorities/low.svg" alt='low' width={20} height={18} />
            case "high":
                return <Image src="https://jira.solulab.com/images/icons/priorities/highest.svg" alt='low' width={20} height={18} />
            case "medium":
                return <Image src="https://jira.solulab.com/images/icons/priorities/medium.svg" alt='low' width={20} height={18} />
            default:
                return null
        }
    }
}