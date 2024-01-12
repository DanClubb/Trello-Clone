"use client"

import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { ExecutedQuery } from "@planetscale/database";
import { useRouter } from "next/navigation";
import { list } from "postcss";
import { useEffect, useMemo, useState } from "react";
import { api } from "~/trpc/react";
import { Lists, Tasks } from "../../../types";
import AddList from "./AddList";
import List from "./List";
import Task from "./Task";

type BoardContentProps = {
    boardId: number
}

export default function BoardContent({boardId}: BoardContentProps) {
    const router = useRouter()
    const serverLists = api.list.getAll.useQuery({boardId}).data
    const [clientLists, setClientLists] = useState<Lists[]>(serverLists ?? [])

    const serverTasks = api.task.getAll.useQuery({boardId: boardId}).data
    const [clientTasks, setClientTasks] = useState<Tasks[]>([])

    const [draggedList, setDraggedList] = useState<Lists | null>(null)
    const [draggedTask, setDraggedTask] = useState<Tasks | null>(null)
    

    const listIds =  clientLists.map(list => list.id);

    const updateListPosition = api.list.updatePosition.useMutation({
        onSuccess: () => {
            router.refresh()
        }
    })

    useEffect(() => {
        setClientLists(serverLists?.sort((a,b) => a.position - b.position) ?? [])
        const tasks = serverTasks?.map(task => task.tasks)
        setClientTasks(tasks ?? [])
        
        
    }, [serverLists, clientTasks])
 
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
            setDraggedTask(null)
        }

        if(e.active.data.current?.type === 'task') {
            setDraggedTask(e.active.data.current?.task as Tasks)
            setDraggedList(null)
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

    const handleDragOver = (e: DragOverEvent) => {
        const {active ,over} = e

        if(!over) return

        const draggedListId = active.id
        const overListId = over.id

        if(draggedListId === overListId) return

        const isActiveATask = active.data.current?.type === "task"
        const isOverATask = over.data.current?.type === "task"

        // dropping task over another task
        if(isActiveATask && isOverATask) {
            setClientTasks([])
        }
    }
    return (
        <DndContext 
            sensors={sensors} 
            onDragStart={(e) => handleDragStart(e)} 
            onDragEnd={(e) => handleDragEnd(e)} 
            onDragOver={(e) => handleDragOver(e)}
        >
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-auto">
                <SortableContext items={listIds}>
                    {clientLists.map((list, index) => (<List key={index} list={list} tasks={clientTasks} setClientTasks={setClientTasks} />))}
                </SortableContext>
                
                <AddList boardId={boardId} numOfLists={clientLists?.length ?? 0} setClientLists={setClientLists} />
            </div>
            <DragOverlay
                dropAnimation={{
                    duration: 50,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}
            >
                {draggedList && <List list={draggedList} tasks={clientTasks} setClientTasks={setClientTasks} overlayStyle="opacity-95 rotate-6" />}
                {draggedTask && <Task listName="" task={draggedTask} overlayStyle="opacity-95 rotate-6" />}
            </DragOverlay>
        </DndContext>
        
    )
}
