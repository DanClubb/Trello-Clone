"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Close from "~/app/_icons/Close"
import { Lists } from "~/app/types"
import { api } from "~/trpc/react"

type AddListProps = {
    boardId: number;
    numOfLists: number;
}

export default function AddList({boardId, numOfLists}: AddListProps) {
    const router = useRouter()
    const [addListClicked, setAddListClicked] = useState(false)
    const [listName, setListName] = useState('')

    const addListRef = useRef<HTMLFormElement | null>(null)
    const listNameRef = useRef<HTMLInputElement | null>(null)

    const createList = api.list.create.useMutation({
        onSuccess: () => {
            router.refresh()
            setListName('')
            listNameRef.current?.focus()
            listNameRef.current?.select()
        }
    })

    useEffect(() => {
        listNameRef.current?.focus()
        listNameRef.current?.select()

        const offClickHandler = (e:any) => {
            if(!addListRef.current?.contains(e.target)) {
                setAddListClicked(false)
            }
        }
        document.addEventListener("click", offClickHandler)

        return () => {
            document.removeEventListener('click', offClickHandler)
        }
    }, [addListClicked])

    return (
        <>
        {
            addListClicked ? 
                <form ref={addListRef} className="p-2 min-w-[17rem] h-fit bg-black rounded-xl text-sm" onSubmit={(e) => {
                    e.preventDefault() 
                    createList.mutate({boardId, name: listName, position: 1})
                }}>
                    <input 
                        ref={listNameRef}
                        type="text" 
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        className="mb-2 px-3 py-2 w-full bg-transparent rounded outline-none ring-2 ring-inset ring-transparent transition hover:bg-gray-800 hover:ring-lightgray focus:bg-transparent focus:ring-skyblue" 
                        placeholder="Enter list title..." 
                    />
                    <div className="flex items-center gap-1.5">
                        <button type="submit" className="px-3 py-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Add list</button>
                        <button className="p-1.5 rounded hover:bg-white/[0.2]" onClick={() => setAddListClicked(false)}>
                            <Close />
                        </button>
                    </div>
                </form>
                :
                <button 
                    className="px-4 py-3 min-w-[17rem] h-fit bg-slate-200/[0.3] rounded-xl text-white text-sm text-left hover:bg-slate-400/[0.4]"
                    onClick={() => setAddListClicked(true)}   
                >
                    + {numOfLists > 0 ? 'Add another list':'Add a list'}
                </button>
        }
        </>
        
    )
}
