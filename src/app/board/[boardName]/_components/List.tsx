"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Lists, Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddTask from "./AddTask";
import ListActions from "./ListActions";
import Task from "./Task";

type ListProps = {
    list: Lists
}

export default function List({list}: ListProps) {
    const router = useRouter()
    const [showListActions, setShowListActions] = useState(false)
    const [clientTasks, setClientTasks] = useState<Tasks>([])
    const listRef = useRef<HTMLDivElement | null>(null)
    // const [serverTasks, setServerTasks] = useState<Tasks | undefined>(api.task.getAll.useQuery({listId}).data)

    const serverTasks = api.task.getAll.useQuery({listId: list.id}).data

    let tasks = clientTasks.sort((a,b) => a.position - b.position)
    
    if (serverTasks) {
        tasks = [...serverTasks, ...clientTasks].sort((a, b) => a.position - b.position)
        // for(let i = 0; i < tasks.length - 1; i++) {
        //     const options = {
        //         year: 'numeric',
        //         month: 'long',
        //         day: 'numeric',
        //         hour: 'numeric',
        //         minute: 'numeric',
        //         second: 'numeric'
        //       } as Intl.DateTimeFormatOptions;
            
        //     if(tasks[i]?.createdAt.toLocaleDateString('en-GB', options) === tasks[i+1]?.createdAt.toLocaleDateString('en-GB', options)) tasks.splice(i, 1)
        // }
    }

    const {
        setNodeRef, 
        attributes, 
        listeners, 
        transform, 
        transition,
        isDragging
    } = useSortable({
        id: list.id,
        data: {
            type: "list",
            list
        }
    })

    const style = {
        transition, 
        transform: CSS.Translate.toString(transform),
    }
    if (isDragging) {
        return (
        <div 
            ref={setNodeRef} 
            style={{...style, height: 102}} 
            className="p-2 min-w-[17rem] h-fit bg-black/[0.2] rounded-xl text-sm relative"
        ></div>
        )
    }

    return (
        <div 
            ref={setNodeRef}
            style={style} 
            className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm relative"
        >
            <div className="flex items-center mb-1.5">
                <h3 contentEditable
                    {...attributes}
                    {...listeners}
                    className="mr-auto px-3 py-2 w-full font-bold"
                >
                    {list.name}
                </h3>
                <div 
                    className="cursor-pointer"
                    onClick={() => setShowListActions(true)}
                >
                    <Ellipsis width={15} height={15} />
                </div>
            </div>
            
            <div className="min-h-2">
                {tasks.map((task, index) => <Task key={index} taskName={task.name} taskDescription={task.description} listName={list.name} />)}
            </div>
            {/* setClientTasks={setClientTasks} */}
            <AddTask listId={list.id} numOfTasks={tasks.length} setClientTasks={setClientTasks} />
            {showListActions && <ListActions listId={list.id} setShowListActions={setShowListActions} />}
        </div>
    )
}

