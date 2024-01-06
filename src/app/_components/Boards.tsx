import { api } from "~/trpc/server";
import BoardCard from "./BoardCard";
import CreateBoardCard from "./CreateBoardCard";

export default async function Boards() {
    const usersBoards = await api.board.getAllBoards.query()

    return (
        <div className="grow flex flex-col max-w-200 w-fit">
            <header className="flex gap-2 mb-2">
                {/* icon goes here  */}
                👨‍💻
                <h2 className="font-semibold">Your Boards</h2>
            </header>
            <div className="flex gap-4 flex-wrap overflow-auto">
               {usersBoards.map((board) => (
                        <BoardCard key={board.id} boardName={board.name} boardColor={board.color} />
                    )   
                )} 
                <CreateBoardCard />
            </div>            
        </div>
    )
}
