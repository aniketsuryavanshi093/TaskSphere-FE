import { ticketUpdateValuesType } from '@/app/dashboard/manageticket/[id]/page';
import { DragDropCOlumnstype } from '@/commontypes';
import useUpdateTicketHook from '@/hooks/useUpdateTicketHook';
import { useSession } from 'next-auth/react';
import React, { useTransition } from 'react'
import { DropResult } from 'react-beautiful-dnd';

const useDragEndHook = (projectId: string) => {
    const { handleUpdateTicket } = useUpdateTicketHook();
    const { data } = useSession()
    const [pending, startTransition] = useTransition();
    const onDragEnd = async (
        result: DropResult,
        columns: DragDropCOlumnstype | null,
        setColumns: React.Dispatch<React.SetStateAction<DragDropCOlumnstype | null>>
    ) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const values: ticketUpdateValuesType = {
                status: destination.droppableId,
                currentstatus: source.droppableId,
                updatedBy: data?.user.id,
                assignedTo: columns[source.droppableId].items.find(
                    (el) => el._id === result.draggableId
                )?.assignedTo,
                projectId,
                ticketId: result.draggableId,
            };
            startTransition(() => handleUpdateTicket(values));
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
    return { onDragEnd }
}

export default useDragEndHook