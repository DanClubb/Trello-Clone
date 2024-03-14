"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Lists, Tasks } from "~/app/types";
import AddTask from "./AddTask";
import ListActions from "./ListActions";
import Task from "./Task";

type ListProps = {
    list: Lists
    tasks?: Tasks[];
}

export default function List({list, tasks}: ListProps) {
    const [showListActions, setShowListActions] = useState(false)


    // tasks prop has all tasks for the current board so filter the tasks just for the current list
    const currentListTasks = tasks?.filter((task) => task.listId === list?.id)

    const listRef = useRef<HTMLDivElement | null>(null)

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
        },
        transition: {
            duration: 100,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
          },
    })

    const style = {
        transition, 
        transform: CSS.Translate.toString(transform),
    }

    if (isDragging) {
        return (
        <div 
            ref={(element) => {listRef.current = element; setNodeRef(element);}}
            style={{...style, height: listRef.current?.scrollHeight}} 
            className="p-2 min-w-[17rem] h-fit bg-black/[0.2] rounded-xl text-sm relative"
        ></div>
        )
    }

    return (
        <div 
            ref={(element) => {listRef.current = element; setNodeRef(element);}}
            style={{...style, rotate: isDragging ? '4deg' : '0'}} 
            className={`p-2 min-w-[17rem] h-fit bg-neutral-950 rounded-xl text-sm relative`}
        >
            <div className="flex items-center mb-1.5">
                <h3 
                    {...attributes}
                    {...listeners}
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
            {showListActions && <ListActions listId={list?.id} showListActions={showListActions} setShowListActions={setShowListActions} />}
        </div>
    )
}
