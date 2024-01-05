import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";

type CreateBoardModalProps = {
    setShowModal:  React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateBoardModal({setShowModal}: CreateBoardModalProps) {
    const router = useRouter()
    const boardColors = ['red', 'sky', 'violet', 'green', 'yellow']
    const [activeColor, setActiveColor] = useState('red')
    const [boardTitle, setBoardTitle] = useState('')
    const boardTitleRef = useRef<HTMLInputElement>(null)

    const createBoard = api.board.createBoard.useMutation({
        onSuccess: () => {
            router.replace(`/board/${boardTitle.split(' ').join('-').toLowerCase()}`)
        }
    })

    const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createBoard.mutate({name: boardTitle})
    }

    useEffect(() => {
        boardTitleRef.current?.focus()
        boardTitleRef.current?.select()
    }, [])
    return (
        <div className="fixed top-0 left-0 z-10 w-full h-full">
            <div className="w-11/12 sm:w-4/12 rounded-xl absolute top-2/4 left-2/4 -translate-y-3/4 -translate-x-1/2 z-20 bg-darkgray">
                <button className="block mt-2 mr-2 ml-auto" 
                    onClick={() => {
                        setShowModal(false)}}
                >
                    {/* <IoClose size='2rem' /> */}
                    close
                </button>
                <h1 className="mb-4 text-xl text-center">Create Board</h1>
                <form className="flex flex-col gap-6 px-8 py-2" onSubmit={(e) => handleModalSubmit(e)}>
                    <div>
                        <span>Background</span>
                        <div className="flex gap-2 mt-1">
                            {
                                boardColors.map((color) => (
                                    <div 
                                        className={`flex justify-center items-center w-16 h-10 bg-${color}-400 text-xl text-slate-900 cursor-pointer`}
                                        onClick={() => setActiveColor(color)}
                                    >
                                        {activeColor === color ? '✔️' : ''}
                                    </div>
                                ))
                            }
                            
                        </div>
                        
                    </div>
                    <div>
                        <label htmlFor="">Board title <span className="text-red-500">*</span></label>
                        <input 
                            ref={boardTitleRef}
                            type="text" 
                            value={boardTitle}
                            className={`block mt-1 px-4 py-2 w-full bg-zinc-900 outline-none border-0 rounded-sm ring-2 ring-inset ${boardTitle.length >= 1 ? 'ring-slate-600' : 'ring-red-500'} focus:ring-2 focus:ring-inset focus:ring-skyblue`}
                            onChange={(e) => setBoardTitle(e.target.value)}
                            required 
                            />
                    </div>
                    

                    <button 
                        type="submit" 
                        className={`my-4 py-2 w-full rounded text-center transition ${boardTitle.length >= 1 ? 'text-slate-900 bg-skyblue hover:bg-blue-300' : 'bg-slate-300/[0.4] text-lightblue cursor-not-allowed'}`}
                        disabled={boardTitle ? false : true}
                    >
                        {
                            createBoard.isLoading ? 'Loading...' : 'Create'
                        }
                    </button>
                </form>
            </div>

                
            <div className="bg-slate-600 w-full h-full opacity-80"></div>
        </div>
    )
}