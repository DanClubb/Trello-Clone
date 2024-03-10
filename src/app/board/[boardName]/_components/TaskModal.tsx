import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import Close from "../../../_icons/Close";

type CreateBoardModalProps = {
    taskName: string;
    listName: string;
    taskDescription: string | null;
    showModal: boolean;
    setShowModal:  React.Dispatch<React.SetStateAction<boolean>>;
}

// console.log(close)

export default function CreateBoardModal({taskName, taskDescription, listName, showModal, setShowModal}: CreateBoardModalProps) {
    const router = useRouter()
    const [descriptionOpened, setDescriptionOpened] = useState(false)
    const [description, setDescription] = useState(taskDescription ?? '')

    const taskModalRef = useRef<HTMLDivElement | null>(null)


    const updateDescription = api.task.updateDecription.useMutation({
        onSuccess: () => {
            router.refresh()
        }
    })

    const handleDescriptionUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (description) {
            updateDescription.mutate({description})
            setDescriptionOpened(false)
        }
    }

    useEffect(() => {
        const offClickHandler = (e:any) => {
            if(!taskModalRef.current?.contains(e.target)) {
                setShowModal(false)
            }
        }
        document.addEventListener("click", offClickHandler)

        return () => {
            document.removeEventListener('click', offClickHandler)
        }
    }, [showModal])
    return (
        <div className="fixed top-0 left-0 z-10 w-full h-full">
            <div ref={taskModalRef} className="px-6 pt-4 pb-8 min-w-[21rem] md:w-[48rem] rounded-xl absolute top-2/4 left-2/4 -translate-y-3/4 -translate-x-1/2 z-20 bg-darkgray">
                <button className="absolute top-4 right-4 p-2 transition-all hover:bg-lightblue/10 hover:rounded-full" 
                    onClick={() => {
                        setShowModal(false)}}
                >
                    <Close />
                </button>
                <p className="mt-6 mb-2 text-2xl">{taskName}</p>
                <p className="text-xs">in list {listName}</p>
                <form className="mt-6 flex flex-col gap-6" onSubmit={(e) => handleDescriptionUpdate(e)}>
                    <div>
                        <label className="mb-4 text-lg" htmlFor="">Description</label>
                        <textarea
                            value={description}
                            className={`block mt-1 px-4 py-2 w-[24rem] md:w-[32rem] h-14 bg-[#3a454c] rounded resize-none outline-0 placeholder:text-[#b6c2d0] placeholder:text-sm hover:bg-[#44505a]`}
                            onChange={(e) => setDescription(e.target.value)}
                            onClick={() => setDescriptionOpened(true)}
                            placeholder={taskDescription ?? 'Add a more detailed description...' }
                        />
                        {descriptionOpened && (
                            <div className="flex gap-4 mt-2">
                                <button type="submit" className="px-3 p-1.5 bg-skyblue rounded text-slate-900 hover:bg-blue-300 transition">Save</button>
                                <button className="w-fit" 
                                    onClick={() => {
                                        setDescription(taskDescription ?? '')
                                        setDescriptionOpened(false)}}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        
                    </div>
                </form>
            </div>
            <div className="bg-slate-600 w-full h-full opacity-80"></div>
        </div>
    )
}