"use client"

import { useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddTask from "./AddTask";
import Task from "./Task";

type ListProps = {
    listName: string;
    listId: number;
}

export default function List({listName, listId}: ListProps) {
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
        <div className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm">
            <div className="flex items-center mb-1.5">
                <h3 className="mr-auto px-3 py-2 font-bold">{listName}</h3>
                <Ellipsis width={15} height={15} />  
            </div>
            
            <div className="min-h-2">
                {tasks.map(task => <Task taskName={task.name} />)}
            </div>
            <AddTask listId={listId} setClientTasks={setClientTasks} numOfTasks={tasks.length} />
        </div>
    )
}

