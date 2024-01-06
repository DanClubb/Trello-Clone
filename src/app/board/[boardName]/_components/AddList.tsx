"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { api } from "~/trpc/react"

type AddListProps = {
    boardId: number;
    numOfLists: number;
}

export default function AddList({boardId, numOfLists}: AddListProps) {
    const router = useRouter()
    const [addListClicked, setAddListClicked] = useState(false)
    const [listName, setListName] = useState('')

    const createList = api.list.create.useMutation({
        onSuccess: () => {
            router.refresh()
            setAddListClicked(false)
        }
    })

    const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createList.mutate({name: listName, boardId: boardId, position: numOfLists+1})
    }

    return (
        <>
        {
            addListClicked ? 
                <form className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm" onSubmit={(e) => handleCreateList(e)}>
                    <input 
                        type="text" 
                        onChange={(e) => setListName(e.target.value)}
                        className="mb-2 px-3 py-2 w-full bg-transparent rounded outline-none ring-2 ring-inset ring-transparent transition hover:bg-gray-800 hover:ring-lightgray focus:bg-transparent focus:ring-skyblue" 
                        placeholder="Enter list title..." 
                    />
                    <div className="flex items-center gap-4">
                        <button type="submit" className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Add list</button>
                        <button onClick={() => setAddListClicked(false)}>x</button>
                    </div>
                </form>
                :
                <button 
                    className="px-4 py-3 min-w-[17rem] h-fit bg-slate-200/[0.3] rounded-xl text-white text-sm text-left hover:bg-slate-400/[0.4]"
                    onClick={() => setAddListClicked(true)}    
                >
                    + Add a list
                </button>
        }
        </>
        
    )
}
