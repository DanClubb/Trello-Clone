import Link from "next/link"
import { api } from "~/trpc/server"

type BoardNavProps = {
    boardName: string
}

export default async function BoardNav({boardName}: BoardNavProps) {
    const boards = await api.board.getAllBoards.query()
    return (
        <div className="pt-6 min-w-64 min-h-screen">
            <div className="flex flex-col">
                <h4 className="mb-2 px-4 text-sm font-bold">Your boards</h4>
                {
                    boards.map((board) => (
                        <Link 
                            href={`/board/${board.name.split(' ').join('-').toLowerCase()}`}
                            className={`flex gap-2 px-4 py-2 text-sm ${board.name.toLowerCase() === boardName ? 'bg-zinc-600' : ''} hover:bg-zinc-700`}
                        >
                            <span className={`w-6 h-5 ${board.color} rounded-sm`}></span>
                            {board.name}
                        </Link>
                    ))
                }
            </div>
            
        </div>
    )
}
