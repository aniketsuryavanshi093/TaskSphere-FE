"use client"
import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import "./dropcontext.scss"
import TaskCard from '../Task/Task';
import { DragDropCOlumnstype } from '@/commontypes';

type Pageprops = {
    onDragEnd?: (e: any) => void, dragDropdata: DragDropCOlumnstype | null
}

const DraggableContext: React.FC<Pageprops> = ({ dragDropdata }) => {
    const [columns, setColumns] = useState<DragDropCOlumnstype | null>(null)
    useEffect(() => {
        if (dragDropdata) {
            if (Object?.keys(dragDropdata).length) {
                setColumns(dragDropdata)
            }
        } else {
            setColumns(null)
        }
    }, [dragDropdata])
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
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
    };
    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
            <React.StrictMode>
                <div className='dragdroparea'>
                    <div className='taskclumnwrapper my-2  wrapper flex-wrap gap-2 align-start'>
                        {columns ? Object?.entries(columns).map(([columnId, column], index) => {
                            return (
                                <Droppable key={columnId} droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div className='tasklist'
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className='wrapper justify-between'>
                                                <div className='wrapper justify-start'>
                                                    <div className='colindicator' style={{ background: column.color }} />
                                                    <span className='column-title mx-2'>{column.title}</span>
                                                    <div className='tasksindicator wrapper'>
                                                        <span>{column.items.length}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='columnstroke my-2' style={{ background: column.color }} />
                                            {column.items.map((item, index) => (
                                                <TaskCard key={item._id} item={item} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </div >
                                    )}
                                </Droppable>
                            );
                        }) : (
                            [{
                                title: 'To Do',
                                color: "#5030E5",
                            }, {
                                title: 'On Progress',
                                color: "#FFA500"
                            }, {
                                title: 'Done',
                                color: "#8BC48A",
                            }].map((el) => (
                                < Droppable key={el.color} droppableId={el.color}>
                                    {(provided, snapshot) => (
                                        <div className='tasklist'
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className='wrapper justify-between'>
                                                <div className='wrapper justify-start'>
                                                    <div className='colindicator' style={{ background: el.color }} />
                                                    <span className='column-title mx-2'>{el.title}</span>
                                                    <div className='tasksindicator wrapper'>
                                                        <span>0</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='columnstroke my-2' style={{ background: el.color }} />
                                            <div className='wrapper mt-5 '>
                                                <p className='text_primary pt-4 text_bold '>No task found!.</p>
                                            </div>
                                            {provided.placeholder}
                                        </div >
                                    )}
                                </Droppable>
                            ))

                        )}
                    </div >
                </div>
            </React.StrictMode>

        </DragDropContext >
    );
}

export default DraggableContext