import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Tasks } from "~/app/types";
import TaskModal from "./TaskModal";

type TaskProps = {
    listName?: string;
    task: Tasks;
    isOverlay?: boolean;
}

export default function Task({listName, task, isOverlay}: TaskProps) {
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
                ref={setNodeRef}
                style={{...style, height: 40}} 
                className="mb-2.5 p-2 bg-white/[0.05] rounded-xl text-sm relative"
            ></div>
        )
    }
  
    return (
        <>
        <div 
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`mb-2.5 px-3 py-2.5 w-full max-h-40 bg-[#22272b] rounded-lg text-s leading-5 outline-none transition overflow-y-auto cursor-pointer transition-all duration-200 ${!isOverlay &&'hover:outline-blue-300'} ${isOverlay && 'shadow-black shadow rotate-[5deg] opacity-95'}`}
            onClick={() => setTaskIsOpen(true)}
        >
            {task.name}
        </div>
        {
            taskIsOpen && <TaskModal taskName={task.name} taskDescription={task.description} listName={listName ?? ''} showModal={taskIsOpen} setShowModal={setTaskIsOpen} />
        }
        </>
        
    )
}

