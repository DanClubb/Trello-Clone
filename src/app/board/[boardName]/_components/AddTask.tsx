import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tasks } from "~/app/types";
import { api } from "~/trpc/react";

type AddTaskProps = {
    listId: number;
    numOfTasks: number;
    setClientTasks: React.Dispatch<React.SetStateAction<Tasks>>
}

export default function AddTask({listId, numOfTasks, setClientTasks}: AddTaskProps) {
    const router = useRouter();
    const [addTaskClicked, setAddTaskClicked] = useState(false)
    const [taskName, setTaskName] = useState('')

    const createTask = api.task.create.useMutation({
        onSuccess: () => {
            router.refresh()
            setClientTasks((prev) => [...prev, {id: 3, name: taskName, listId, position: numOfTasks + 1, description: null, createdAt: new Date(), updatedAt: null}])
            setTaskName('')
        }
    })

    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTask.mutate({name: taskName, listId, position: numOfTasks + 1})
    }

    const handleTextareaGrowth = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = "auto"
        e.currentTarget.style.height =  e.currentTarget.scrollHeight + "px"
    }

    return (
        <>
        {
            addTaskClicked ? 
            <form className="h-fit bg-black rounded-xl text-sm" onSubmit={(e) => handleCreateTask(e)}>
                <textarea  
                    onInput={(e) => {
                        handleTextareaGrowth(e)
                        setTaskName(e.currentTarget.value)}
                    }
                    value={taskName}
                    className="block resize-none mb-2 px-3 pt-3 pb-7 w-full max-h-40 bg-charcoal rounded-lg text-xs leading-5 outline-none transition overflow-y-auto" 
                    placeholder="Enter a title for this card..." 
                ></textarea>
                <div className="flex items-center gap-4">
                    <button type="submit" className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Add card</button>
                    <button onClick={() => setAddTaskClicked(false)}>x</button>
                </div>
            </form>
            :
            <button 
                type="submit" 
                className="px-3 py-2 w-full rounded text-left hover:bg-slate-300/[0.3] transition"
                onClick={() => setAddTaskClicked(true)}
            >
                {createTask.isLoading ? '...Loading' : '+ Add a card'}
            </button>
        }
        </>
        
    )
}
