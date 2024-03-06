"use client"

import { useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Lists, Tasks } from "~/app/types";
import AddTask from "./AddTask";
import ListActions from "./ListActions";
import Task from "./Task";

type ListProps = {
    list: Lists | undefined
    tasks?: Tasks[];
    overlayStyle?: string
}

export default function List({list, tasks, overlayStyle}: ListProps) {
    const [showListActions, setShowListActions] = useState(false)

    const currentListTasks = tasks?.filter((task) => task.listId === list?.id).sort((a,b) => a.position - b.position)


    return (
        <div 
            className={`p-2 min-w-[17rem] h-fit bg-neutral-950 rounded-xl text-sm relative ${overlayStyle}`}
        >
            <div className="flex items-center mb-1.5">
                <h3 
                    className="mr-auto px-3 py-1.5 w-full font-bold"
                >
                    {list?.name}
                </h3>
                <div 
                    className="cursor-pointer"
                    onClick={() => setShowListActions(true)}
                >
                    <Ellipsis width={15} height={15} />
                </div>
            </div>
            
            <div className="min-h-2">
                   {currentListTasks?.map((task, index) => <Task key={index} task={task} listName={list?.name ?? ''} />)} 
                
            </div>
            <AddTask listId={list?.id} numOfTasks={tasks?.length ?? 0} />
            {showListActions && <ListActions listId={list?.id} setShowListActions={setShowListActions} />}
        </div>
    )
}

