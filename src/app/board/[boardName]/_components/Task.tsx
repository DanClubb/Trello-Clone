import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Tasks } from "~/app/types";
import TaskModal from "./TaskModal";

type TaskProps = {
    listName: string;
    task: Tasks;
}

export default function Task({listName, task}: TaskProps) {
    const [taskIsOpen, setTaskIsOpen] = useState(false)
  
    return (
        <>
        <div 
            className={`mb-2.5 px-3 py-2.5 w-full max-h-40 bg-[#22272b] rounded-lg text-s leading-5 outline-none transition overflow-y-auto cursor-pointer transition-all duration-200 hover:outline-blue-300`}
            onClick={() => setTaskIsOpen(true)}
        >
            {task.name}
        </div>
        {
            taskIsOpen && <TaskModal taskName={task.name} taskDescription={task.description} listName={listName} showModal={taskIsOpen} setShowModal={setTaskIsOpen} />
        }
        </>
        
    )
}

