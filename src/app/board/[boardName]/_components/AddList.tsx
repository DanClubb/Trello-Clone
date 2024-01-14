import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Lists } from "~/app/types"
import { api } from "~/trpc/react"

type AddListProps = {
    boardId: number;
    numOfLists: number;
    setClientLists: React.Dispatch<React.SetStateAction<Lists[]>>
}

export default function AddList({boardId, numOfLists, setClientLists}: AddListProps) {
    const router = useRouter()
    const [addListClicked, setAddListClicked] = useState(false)
    const [listName, setListName] = useState('')

    const listNameRef = useRef<HTMLInputElement | null>(null)

    const createList = api.list.create.useMutation({
        onSuccess: () => {
            setClientLists((prev) => {
                const [heighestId] = prev.sort((a,b) =>  b.id - a.id)
                return [...prev, {id: (heighestId?.id ?? 0) + 1, name: listName, boardId, position: numOfLists + 1, description: null, createdAt: new Date(), updatedAt: null}]
            })
            setAddListClicked(false)
            router.refresh
        }
    })

    const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createList.mutate({name: listName, boardId: boardId, position: numOfLists+1})
    }

    useEffect(() => {
        listNameRef.current?.focus()
        listNameRef.current?.select()
    }, [addListClicked])

    return (
        <>
        {
            addListClicked ? 
                <form className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm" onSubmit={(e) => handleCreateList(e)}>
                    <input 
                        ref={listNameRef}
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
