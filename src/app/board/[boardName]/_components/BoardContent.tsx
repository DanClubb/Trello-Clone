"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { list } from "postcss";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import { Lists } from "../../../types";
import AddList from "./AddList";
import List from "./List";

type BoardContentProps = {
    boardId: number
}

export default function BoardContent({boardId}: BoardContentProps) {
    const router = useRouter()
    const serverLists = api.list.getAll.useQuery({boardId}).data
    const [draggedList, setDraggedList] = useState<Lists | null>(null)
    const [clientLists, setClientLists] = useState<Lists[]>(serverLists ?? [])

    const listIds =  clientLists.map(list => list.id);

    const updateListPosition = api.list.updatePosition.useMutation({
        onSuccess: () => {
            router.refresh()
        }
    })

    useEffect(() => {
        setClientLists(serverLists?.sort((a,b) => a.position - b.position) ?? [])
    }, [serverLists])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1
            }
        })
    )

    const handleDragStart = (e: DragStartEvent) => {
        if(e.active.data.current?.type === 'list') {
            setDraggedList(e.active.data.current?.list as Lists)
        }
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const {active ,over} = e

        if(!over) return

        const draggedListId = active.id
        const overListId = over.id

        if(draggedListId === overListId) return

        setClientLists(prev => {
            const draggedListIndex = prev?.findIndex((list) => list.id === draggedListId)
            const overListIndex = prev?.findIndex((list) => list.id === overListId)

            updateListPosition.mutate({listId: draggedListId as number, position: overListIndex + 1})
            updateListPosition.mutate({listId: overListId as number, position: draggedListIndex + 1})

            return arrayMove(prev, draggedListIndex, overListIndex)
        })

    }
    return (
        <DndContext sensors={sensors} onDragStart={(e) => handleDragStart(e)} onDragEnd={(e) => handleDragEnd(e)}>
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
                <SortableContext items={listIds}>
                    {clientLists.map((list, index) => (<List key={index} list={list} />))}
                </SortableContext>
                
                <AddList boardId={boardId} numOfLists={clientLists?.length ?? 0} setClientLists={setClientLists} />
            </div>
            <DragOverlay>
                {draggedList && <List list={draggedList} />}
            </DragOverlay>
        </DndContext>
        
    )
}
