"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, closestCenter, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lists, Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddList from "./AddList";
import List from "./List";

type BoardContentProps = {
    boardId: number;
    lists: Lists[];
    tasks: Tasks[]
}

export default function BoardContent({boardId, lists, tasks}: BoardContentProps) {
    const router = useRouter()
    const [draggedList, setDraggedList] = useState<Lists | null>(null)
    const [listsCopy, setListsCopy] = useState<Lists[]>([])

    const listIds =  listsCopy.map(list => list.id);

    const updateListPosition = api.list.updatePosition.useMutation()
   
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

        setListsCopy(prev => {
            const draggedListIndex = prev?.findIndex((list) => list.id === draggedListId)
            const overListIndex = prev?.findIndex((list) => list.id === overListId)

            updateListPosition.mutate({listId: draggedListId as number, position: overListIndex + 1})
            updateListPosition.mutate({listId: overListId as number, position: draggedListIndex + 1})

            return arrayMove(prev, draggedListIndex, overListIndex)
        })

    }

    useEffect(() => {
        lists.sort((a, b) => a.position - b.position)
        setListsCopy(lists)
    }, [lists])

    return (
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragStart={(e) => handleDragStart(e)} onDragEnd={(e) => handleDragEnd(e)}>
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
                <SortableContext items={listIds}>
                    {listsCopy.map((list) => (<List key={list.id} list={list} tasks={tasks}/>))}
                </SortableContext>
                
                <AddList boardId={boardId} numOfLists={lists?.length ?? 0} />
            </div> 
            <DragOverlay dropAnimation={{
                duration: 10,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}>
                {draggedList && <List list={draggedList} tasks={tasks} />}
            </DragOverlay>
        </DndContext>
              
    )
}
