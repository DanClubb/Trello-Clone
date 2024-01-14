import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Ellipsis from "~/app/_components/Ellipsis";
import { Lists, Tasks } from "~/app/types";
import { api } from "~/trpc/react";
import AddTask from "./AddTask";
import ListActions from "./ListActions";
import Task from "./Task";

type ListProps = {
    list: Lists
    tasks: Tasks[];
    setClientTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
    overlayStyle?: string
}

export default function List({list, tasks, setClientTasks, overlayStyle}: ListProps) {
    const router = useRouter()
    const [showListActions, setShowListActions] = useState(false)
    const [currentListTasks, setCurrentListTasks] = useState(tasks)

    const taskIds = tasks.map((task) => task.id)
    // const taskIds = [] as Tasks[]

    useEffect(() => {
        setCurrentListTasks(tasks?.filter((task) => task.listId === list.id).sort((a,b) => a.position - b.position) ?? [])
    }, [tasks])

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
            className={`p-2 min-w-[17rem] h-fit bg-neutral-950 rounded-xl text-sm relative ${overlayStyle}`}
        >
            <div className="flex items-center mb-1.5">
                <h3 
                    {...attributes}
                    {...listeners}
                    className="mr-auto px-3 py-1.5 w-full font-bold"
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
                <SortableContext items={taskIds}>
                   {currentListTasks.map((task, index) => <Task key={index} task={task} listName={list.name} />)} 
                </SortableContext>
                
            </div>
            <AddTask listId={list.id} numOfTasks={tasks.length} setClientTasks={setCurrentListTasks} />
            {showListActions && <ListActions listId={list.id} setShowListActions={setShowListActions} />}
        </div>
    )
}

