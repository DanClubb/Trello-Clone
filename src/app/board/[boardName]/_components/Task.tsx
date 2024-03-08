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
  
    return (
        <>
        <div 
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

