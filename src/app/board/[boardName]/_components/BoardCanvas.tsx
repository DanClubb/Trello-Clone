import { api } from "~/trpc/server";
import BoardContent from "./BoardContent";
import BoardHeader from "./BoardHeader";

type BoardProps = {
    boardName:  string;
}

export default async function BoardCanvas({boardName}: BoardProps) {
    const [currentBoard] = await api.board.getByTitle.query({name: boardName.split('-').join(' ')})
    const boardId = currentBoard?.id!

    const serverLists = await api.list.getAll.query({boardId})
    const serverTasks = await api.task.getAll.query({boardId})

    return (
        <>
        {currentBoard && 
            <div className={`flex flex-col grow ${currentBoard.color} overflow-hidden`}>
                <BoardHeader boardName={boardName} />
                <BoardContent boardId={currentBoard.id} lists={serverLists} tasks={serverTasks} />
            </div>
        }
        </>
        
    )
}
