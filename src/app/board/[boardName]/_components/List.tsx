"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddTask from "./AddTask";
import ListActions from "./ListActions";
import Task from "./Task";

type ListProps = {
    listName: string;
    listId: number;
}

export default function List({listName, listId}: ListProps) {
    const router = useRouter()
    const [showListActions, setShowListActions] = useState(false)
    const [clientTasks, setClientTasks] = useState<Tasks>([])
    const serverTasks = api.task.getAll.useQuery({listId}).data

    let tasks = clientTasks.sort((a,b) => a.position - b.position)
    
    if (serverTasks) {
        tasks = [...serverTasks, ...clientTasks].sort((a, b) => a.position - b.position)
        for(let i = 0; i < tasks.length - 1; i++) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              } as Intl.DateTimeFormatOptions;
            
            if(tasks[i]?.createdAt.toLocaleDateString('en-GB', options) === tasks[i+1]?.createdAt.toLocaleDateString('en-GB', options)) tasks.splice(i, 1)
        }
    }
    return (
        <div className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm relative">
            <div className="flex items-center mb-1.5">
                <h3 className="mr-auto px-3 py-2 font-bold">{listName}</h3>
                <div 
                    className="cursor-pointer"
                    onClick={() => setShowListActions(true)}
                >
                    <Ellipsis width={15} height={15} />
                </div>
            </div>
            
            <div className="min-h-2">
                {tasks.map((task, index) => <Task key={index} taskName={task.name} taskDescription={task.description} listName={listName} />)}
            </div>
            <AddTask listId={listId} setClientTasks={setClientTasks} numOfTasks={tasks.length} />
            {showListActions && <ListActions listId={listId} setShowListActions={setShowListActions} />}
        </div>
    )
}

