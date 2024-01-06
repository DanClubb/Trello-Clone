import { api } from "~/trpc/server";
import BoardContent from "./BoardContent";
import BoardHeader from "./BoardHeader";

type BoardProps = {
    boardName:  string;

}

export default async function Board({boardName}: BoardProps) {
    const [currentBoard] = await api.board.getByTitle.query({name: boardName})
    return (
        <>
        {currentBoard && 
            <div className={`flex flex-col grow ${currentBoard.color} overflow-hidden`}>
                <BoardHeader boardName={boardName} />
                <BoardContent boardId={currentBoard.id} />
            </div>
        }
        </>
        
    )
}
