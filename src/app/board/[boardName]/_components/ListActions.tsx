import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Close from "~/app/_icons/Close";
import { api } from "~/trpc/react";

type ListActionsProps = {
    listId?: number;
    showListActions: boolean;
    setShowListActions: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListActions({listId,showListActions, setShowListActions}: ListActionsProps) {
    const router = useRouter()

    const listActionsRef = useRef<HTMLDivElement | null>(null)

    const deleteList = api.list.delete.useMutation({
        onSuccess: () => {
            router.refresh()
            setShowListActions(false)
        }
    })

    useEffect(() => {
        const offClickHandler = (e: MouseEvent) => {
            if(!listActionsRef.current?.contains(e.target as Node)) {
                setShowListActions(false)
            }
        }
        document.addEventListener("click", offClickHandler)

        return () => {
            document.removeEventListener('click', offClickHandler)
        }
    }, [showListActions])

    return (
        <div ref={listActionsRef} className="px-3 py-4 bg-[#282f34] border border-lightgray rounded-lg shadow-black/[0.45] shadow-xl absolute top-10 left-[calc(100%-20px)] z-30">
            <header className="text-base text-center font-semibold mb-8 w-72">
                <p>List actions</p> 
                <button className="p-1.5 absolute top-3 right-2 rounded-md hover:bg-white/[0.2]" onClick={() => setShowListActions(false)}>
                    <Close />
                </button>
            </header>
            
            <button className="w-full text-red-400" onClick={() => deleteList.mutate({listId: listId ?? 1})}>Delete list</button>
        </div>
    )
}
