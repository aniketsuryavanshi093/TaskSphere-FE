"use client"
import React, { useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import "./dropcontext.scss"
import { columnsFromBackend } from '@/constants';
import TaskCard from '../Task/Task';

type Pageprops = {
    onDragEnd?: (e: any) => void, dragdata?: any
}

const DraggableContext: React.FC<Pageprops> = ({ }) => {
    const [columns, setColumns] = useState(columnsFromBackend)

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
                        {Object.entries(columns).map(([columnId, column], index) => {
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
                                                        <span>4</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='columnstroke my-2' style={{ background: column.color }} />
                                            {column.items.map((item, index) => (
                                                <TaskCard key={item} item={item} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </div >
                                    )}
                                </Droppable>
                            );
                        })}
                    </div >
                </div>
            </React.StrictMode>

        </DragDropContext>
    );
}

export default DraggableContext