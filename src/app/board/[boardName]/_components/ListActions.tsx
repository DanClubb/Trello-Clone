import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

type ListActionsProps = {
    listId: number;
    setShowListActions: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListActions({listId, setShowListActions}: ListActionsProps) {
    const router = useRouter()

    const deleteList = api.list.delete.useMutation({
        onSuccess: () => {
            router.refresh()
        }
    })
    return (
        <div className="px-3 py-4 bg-[#282f34] border border-lightgray rounded-lg absolute top-10 left-[calc(100%-20px)] z-30">
            <header className="flex justify-center mb-8 w-72">
                <p>List actions</p> 
                <button className="w-6 h-6 absolute right-2" onClick={() => setShowListActions(false)}>x</button>
            </header>
            
            <button className="w-full text-red-400" onClick={() => deleteList.mutate({listId})}>Delete list</button>
        </div>
    )
}
