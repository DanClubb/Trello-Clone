import { useState } from "react";
import TaskModal from "./TaskModal";

type TaskProps = {
    taskName: string;
    listName: string;
    taskDescription: string | null;
}

export default function Task({taskName, listName, taskDescription}: TaskProps) {
    const [taskIsOpen, setTaskIsOpen] = useState(false)
    return (
        <>
        <div 
            className="mb-2 px-3 py-2 w-full max-h-40 bg-charcoal rounded-lg text-xs leading-5 outline-none transition overflow-y-auto"
            onClick={() => setTaskIsOpen(true)}
        >
            {taskName}
        </div>
        {
            taskIsOpen && <TaskModal taskName={taskName} taskDescription={taskDescription} listName={listName} setShowModal={setTaskIsOpen} />
        }
        </>
        
    )
}

