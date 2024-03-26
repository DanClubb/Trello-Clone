"use client"

import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Lists, Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddList from "./AddList";
import List from "./List";
import Task from "./Task";

type BoardContentProps = {
    boardId: number;
    lists: Lists[];
    tasks: Tasks[]
}

export default function BoardContent({boardId, lists, tasks}: BoardContentProps) {
    const router = useRouter()
    const [draggedList, setDraggedList] = useState<Lists | null>(null)
    const [draggedTask, setDraggedTask] = useState<Tasks | null>(null)
    const [listsClientCopy, setListsClientCopy] = useState<Lists[]>([])
    const [tasksClientCopy, setTasksClientCopy] = useState<Tasks[]>([])


    const listIds =  listsClientCopy.map(list => list.id);

    const updateListPosition = api.list.updatePosition.useMutation()
   
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
              distance: 1
            },
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
        const {active, over} = e
        if(!over) return

        const draggedListId = active.id
        const overListId = over.id

        if(draggedListId === overListId) return

        const isDraggedList = active.data.current?.type === "list"
        if(!isDraggedList) return

        setListsClientCopy(prev => {
            const draggedListIndex = prev?.findIndex((list) => list.id === draggedListId)
            const overListIndex = prev?.findIndex((list) => list.id === overListId)

            const reorderedList = arrayMove(prev, draggedListIndex, overListIndex)

            reorderedList.forEach((list, idx) => updateListPosition.mutate({listId: list.id, position: idx}))
            

            return reorderedList
        })
    }

    const handleDragOver = (e: DragOverEvent) => {
        const {active, over} = e
        if(!over) return

        const activeId = active.id
        const overId = over.id

        if(activeId === overId) return

        const isDraggedTask = active.data.current?.type === 'task'
        const isOverTask = over.data.current?.type === 'task'

        if (!isDraggedTask) return;

        if (isDraggedTask && isOverTask) {
            setTasksClientCopy((prev) => {
                const activeIndex = prev.findIndex(task => task.id === activeId)
                const overIndex = prev.findIndex(task => task.id === overId)

                if (prev[activeIndex]?.listId != prev[overIndex]?.listId) {
                    prev[activeIndex]!.listId = prev[overIndex]!.listId
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                  }

                return arrayMove(prev, activeIndex, overIndex)
            })
        }

        const isActiveList = over.data.current?.type === "list"

        if (isDraggedTask && isActiveList) {
            setTasksClientCopy((prev) => {
                const activeIndex = prev.findIndex(task => task.id === activeId)

                prev[activeIndex]!.listId = overId as number

                return arrayMove(prev, activeIndex, activeIndex)
            })
        }
    }

    useEffect(() => {
        lists.sort((a, b) => a.position - b.position)
        setListsClientCopy(lists)
    }, [lists])

    useEffect(() => {
        tasks.sort((a, b) => a.position - b.position)
        setTasksClientCopy(tasks)
    }, [tasks])

    return (
        <DndContext sensors={sensors} onDragStart={(e) => handleDragStart(e)} onDragEnd={(e) => handleDragEnd(e)} onDragOver={handleDragOver}>
            <div className="flex gap-4 px-3 grow max-h-[calc(100%-6.75rem)] overflow-x-scroll">
                <SortableContext items={listIds}>
                    {listsClientCopy.map((list) => (<List key={list.id} list={list} tasks={tasksClientCopy}/>))}
                </SortableContext>
                
                <AddList boardId={boardId} numOfLists={lists?.length ?? 0} />
            </div> 
            <DragOverlay dropAnimation={{
                duration: 10,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}>
                {draggedList && <List list={draggedList} tasks={tasksClientCopy} isOverlay={true} />}
                {draggedTask && <Task task={draggedTask} isOverlay={true} />}
            </DragOverlay>
        </DndContext>
              
    )
}
