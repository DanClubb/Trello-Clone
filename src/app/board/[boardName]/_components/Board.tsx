import { api } from "~/trpc/server";
import BoardContent from "./BoardContent";
import BoardHeader from "./BoardHeader";

type BoardProps = {
    boardName:  string;

}

export default async function Board({boardName}: BoardProps) {
    const [currentBoard] = await api.board.getByTitle.query({name: boardName})
    return (
        <div className={`grow ${currentBoard?.color}`}>
            <BoardHeader boardName={boardName} />
            <BoardContent />
        </div>
    )
}
