import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Close from "~/app/_icons/Close";
import { Tasks } from "~/app/types";
import { api } from "~/trpc/react";

type AddTaskProps = {
    listId?: number;
    numOfTasks: number;
}

export default function AddTask({listId, numOfTasks}: AddTaskProps) {
    const router = useRouter();
    const [addTaskClicked, setAddTaskClicked] = useState(false)
    const [taskName, setTaskName] = useState('')

    const addTaskRef = useRef<HTMLFormElement | null>(null)
    const taskNameRef = useRef<HTMLTextAreaElement | null>(null)


    const createTask = api.task.create.useMutation({
        onSuccess: () => {
            router.refresh()
            setTaskName('')
        }
    })

    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask.mutate({name: taskName, listId: listId ?? 1, position: numOfTasks + 1})
        taskNameRef.current?.select()
    }

    const handleTextareaGrowth = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "auto"
        e.currentTarget.style.height =  e.currentTarget.scrollHeight + "px"
    }

    useEffect(() => {
        taskNameRef.current?.select()

        const offClickHandler = (e:any) => {
            if(!addTaskRef.current?.contains(e.target)) {
                setAddTaskClicked(false)
            }
        }
        document.addEventListener("click", offClickHandler)

        return () => {
            document.removeEventListener('click', offClickHandler)
        }
    }, [addTaskClicked])


    return (
        <>
        {
            addTaskClicked ? 
            <form className="h-fit bg-black rounded-xl text-sm" onSubmit={(e) => handleCreateTask(e)} ref={addTaskRef}>
                <textarea  
                    ref={taskNameRef}
                    onInput={(e) => {
                        handleTextareaGrowth(e)
                        setTaskName(e.currentTarget.value)}
                    }
                    value={taskName}
                    className="block resize-none mb-2 px-3 pt-3 pb-7 w-full max-h-40 bg-charcoal rounded-lg text-xs leading-5 outline-none transition overflow-y-auto" 
                    placeholder="Enter a title for this card..." 
                ></textarea>
                <div className="flex items-center gap-1.5">
                    <button type="submit" className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Add card</button>
                    <button className="p-1.5 rounded hover:bg-white/[0.2]" onClick={() => setAddTaskClicked(false)}>
                        <Close />
                    </button>
                </div>
            </form>
            :
            <button 
                type="submit" 
                className="px-3 py-2 w-full rounded text-left hover:bg-slate-300/[0.3] transition"
                onClick={() => setAddTaskClicked(true)}
            >
                + Add a card
            </button>
        }
        </>
        
    )
}
