"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Lists } from "../../../types";
import AddList from "./AddList";
import List from "./List";

type BoardContentProps = {
    boardId: number
}

export default function BoardContent({boardId}: BoardContentProps) {
    const lists = api.list.getAll.useQuery({boardId}).data
    const [draggedList, setDraggedList] = useState<Lists | null>(null)
    const [listsClientCopy, setListsClientCopy] = useState<Lists[]>(api.list.getAll.useQuery({boardId}).data ?? [])

    const listIds = lists?.map(list => list.id) ?? []

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1
            }
        })
    )

    const handleDragStart = (e: DragStartEvent) => {
        if(e.active.data.current?.type === 'list') {
            setDraggedList(e.active.data.current?.list)
        }
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const {active ,over} = e

        if(!over) return

        const draggedListId = active.id
        const overListId = over.id

        if(draggedListId === overListId) return

        setListsClientCopy((prev) => {
            const draggedListIndex = prev?.findIndex((list) => list.id === draggedListId)
            const overListIndex = prev?.findIndex((list) => list.id === overListId)

            return arrayMove(prev, draggedListIndex, overListIndex)
        })

    }
    
    return (
        <DndContext sensors={sensors} onDragStart={(e) => handleDragStart(e)} onDragEnd={(e) => handleDragEnd(e)}>
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
                <SortableContext items={listIds}>
                    {listsClientCopy?.map((list, index) => (<List key={index} list={list} />))}
                </SortableContext>
                
                <AddList boardId={boardId} numOfLists={listsClientCopy?.length ?? 0} />
            </div>
            <DragOverlay>
                {draggedList && <List list={draggedList} />}
            </DragOverlay>
        </DndContext>
        
    )
}
