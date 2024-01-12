import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Tasks } from "~/app/types";
import TaskModal from "./TaskModal";

type TaskProps = {
    listName: string;
    task: Tasks;
    overlayStyle?: string;
}

export default function Task({listName, task, overlayStyle}: TaskProps) {
    const [taskIsOpen, setTaskIsOpen] = useState(false)

    const {
        setNodeRef, 
        attributes, 
        listeners, 
        transform, 
        transition,
        isDragging
    } = useSortable({
        id: task.id,
        data: {
            type: "task",
            task
        }
    })

    const style = {
        transition, 
        transform: CSS.Translate.toString(transform),
    }

    if(isDragging) {
        return (
            <div 
                ref={setNodeRef}
                style={style}
                className="mb-2 px-3 py-2 w-full h-9 bg-lime-900/[0.3] rounded-lg"
            >
            </div>
    )}

    return (
        <>
        <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-2 px-3 py-2 w-full max-h-40 bg-charcoal rounded-lg text-xs leading-5 outline-none transition overflow-y-auto ${overlayStyle}`}
            onClick={() => setTaskIsOpen(true)}
        >
            {task.name}
        </div>
        {
            taskIsOpen && <TaskModal taskName={task.name} taskDescription={task.description} listName={listName} setShowModal={setTaskIsOpen} />
        }
        </>
        
    )
}

