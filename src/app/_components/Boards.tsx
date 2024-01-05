import { api } from "~/trpc/server";
import BoardCard from "./BoardCard";
import CreateBoardCard from "./CreateBoardCard";

export default async function Boards() {
    const usersBoards = await api.board.getAllBoards.query()

    return (
        <div className="max-w-200 w-fit">
            <header className="mb-2">
                {/* icon goes here  */}
                <h2 className="font-semibold">Your Boards</h2>
            </header>
            <div className="flex gap-4 flex-wrap">
               {usersBoards.map((board) => (
                        <BoardCard boardName={board.name} />
                    )   
                )} 
                <CreateBoardCard />
            </div>            
        </div>
    )
}
